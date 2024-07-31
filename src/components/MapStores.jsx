import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../assets/marker-icon.png';
import { getLogoImage, getVendedores } from '../services/vendedoresService';
import SwipeableEdgeDrawer from './SwipeableEdgeDrawer';
import logoDefault from "../assets/logo_default.png";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Raiting from './Raiting';

// Icono personalizado para Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
});

// Icono personalizado para la ubicación del usuario
const userLocationIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

function LocationMarker({ setUserPositionProp, setUserPositionState }) {
    const map = useMap();

    useEffect(() => {
        map.locate().on('locationfound', function (e) {
            setUserPositionProp(e.latlng); // Update the parent component's state
            setUserPositionState(e.latlng); // Update the local state in MapWithSidebar
            map.flyTo(e.latlng, map.getZoom());
            L.marker(e.latlng, { icon: userLocationIcon }).addTo(map).bindPopup("Tú").openPopup();
        });
    }, [map, setUserPositionProp, setUserPositionState]);

    return null;
}

function UserLocationButton() {
    const map = useMap();

    const handleUserLocationClick = () => {
        map.locate().on('locationfound', function (e) {
            map.flyTo(e.latlng, map.getZoom());
            L.marker(e.latlng, { icon: userLocationIcon }).addTo(map).bindPopup("Tú").openPopup();
        });
    };

    return (
        <button onClick={handleUserLocationClick} className="btn btn-rosa">
            <i className="bi bi-crosshair2"></i>
        </button>
    );
}

const SelectedStoreMarker = ({ store }) => {
    const map = useMap();
    const navigate = useNavigate();
    const [logo, setLogo] = useState(null);

    useEffect(() =>{
        const fetchLogo = async () => {
            try {
                const logoImg = await getLogoImage(store.vendedor_id);
                setLogo(logoImg);
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };

        fetchLogo();
    }, [store.vendedor_id]);

    const gotoPerfilVendedor = () => {
        navigate(`/cuponero/perfil-vendedor/${store.vendedor_id}`);
    }

    useEffect(() => {
        map.flyTo([store.location.coordinates[0], store.location.coordinates[1]], 13);
        const popupContent = `
            <div onClick={gotoPerfilVendedor}>
                <div>
                    <img
                        src=${logo || logoDefault}
                        alt="Logo de la tienda"
                        style="max-width: 100%; height: auto;"
                    />
                </div>
                <div>
                    <b>${store.nombreTienda}</b><br />
                    Calificación: ${store.rating}
                </div>
            </div>
        `;
        const popup = L.popup()
            .setLatLng([store.location.coordinates[0], store.location.coordinates[1]])
            .setContent(popupContent)
            .openOn(map);

        return () => {
            map.closePopup(popup);
        };
    }, [map, store, logo, gotoPerfilVendedor]);

    return (
        <Marker 
            position={[store.location.coordinates[0], store.location.coordinates[1]]}
            eventHandlers={{
                click: gotoPerfilVendedor,
            }}
        >
            <Popup eventHandlers={{click: gotoPerfilVendedor}}>
                <div>
                    <img
                        src={store.logo || logoDefault}
                        alt="Logo de la tienda"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>
                <div>
                    <b>{store.nombreTienda}</b><br />
                    Calificación: {store.rating}
                </div>
            </Popup>
        </Marker>
    );
};

// Componentes para el mapa y los controles personalizados
function CustomZoomControls() {
    const map = useMap();

    const zoomIn = () => {
        map.zoomIn();
    };

    const zoomOut = () => {
        map.zoomOut();
    };

    return (
        <div className="zoom-controls">
            <UserLocationButton />
            <button onClick={zoomIn} className="btn btn-azul">+</button>
            <button onClick={zoomOut} className="btn btn-azul">-</button>
        </div>
    );
}

const MapWithSidebar = ({ setUserPosition }) => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [userPosition, setUserPositionState] = useState(null);
    const [vendedores, setVendedores] = useState([]);
    const [logo, setLogo] = useState(null);
    const mapRef = useRef();

    useEffect(() => {
        const fetchAndSetVendedores = async () => {
            try {
                const data = await getVendedores('Complete');
                setVendedores(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);
    

    const sortedVendedores = userPosition
    ? [...vendedores].sort((a, b) => {
        const hasCoordinatesA = a.location?.coordinates && a.location.coordinates.length === 2;
        const hasCoordinatesB = b.location?.coordinates && b.location.coordinates.length === 2;

        if (hasCoordinatesA && hasCoordinatesB) {
            const distanceA = calculateDistance(userPosition.lat, userPosition.lng, a.location.coordinates[0], a.location.coordinates[1]);
            const distanceB = calculateDistance(userPosition.lat, userPosition.lng, b.location.coordinates[0], b.location.coordinates[1]);
            return distanceA - distanceB;
        } else if (hasCoordinatesA) {
            return -1;
        } else if (hasCoordinatesB) {
            return 1;
        } else {
            return 0;
        }
    })
    : vendedores;

    const handleStoreClick = (store) => {
        setSelectedStore(store);
    };

    const handleMouseEnterMap = () => {
        setSidebarVisible(false);
    };

    const handleMouseLeaveMap = () => {
        setSidebarVisible(true);
    };

    const esPantallaGrande = useMediaQuery('(min-width: 767px)');

    const renderTooltip = (props, data) => (
        <Tooltip id="button-tooltip" className='tiendas-tooltip' {...props}>
            <img src={vendedores.logo || logoDefault} alt="Logo del vendedor" className='m-auto' style={{ maxWidth: "200px" }} />
            <h4>{data.nombreTienda}</h4>
            <h5 className='tiendas-tooltip-desc'>{data.categorias && data.categorias.join(', ')}</h5>
            <p>Telefono: {data.telefono}</p>
            {data.paginaWeb && <p>Web: {data.paginaWeb}</p>}
        </Tooltip>
    );

    return (
        <div className="sidebar-map-container">
            {esPantallaGrande ? (
                <div className={`sidebar-map ${sidebarVisible ? 'visible' : 'hidden'}`}>
                    <h4>Tiendas</h4>
                    <ul className="list-group">
                        {sortedVendedores.map((vendedor) => (
                            <OverlayTrigger
                                key={vendedor.vendedor_id}
                                placement="right"
                                delay={{ show: 150, hide: 0 }}
                                overlay={(props) => renderTooltip(props, vendedor)}
                            >
                                <li className="list-group-item" onClick={() => handleStoreClick(vendedor)}>
                                    <strong>{vendedor.nombreTienda}</strong>
                                    <br />
                                    <p>Calificación: <Raiting vendedorId={vendedor.vendedor_id}/></p>
                                    {userPosition && vendedor.location?.coordinates && (
                                        <p>
                                            Distancia: {calculateDistance(userPosition.lat, userPosition.lng, vendedor.location.coordinates[0], vendedor.location.coordinates[1]).toFixed(2)} km
                                        </p>
                                    )}
                                </li>
                            </OverlayTrigger>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="sidebar_bottom_mp">
                    <SwipeableEdgeDrawer vendedores={sortedVendedores} onStoreClick={handleStoreClick} />
                </div>
            )}
            <div className="map-wrapper" onMouseEnter={handleMouseEnterMap} onMouseLeave={handleMouseLeaveMap}>
                <MapContainer
                    center={[4.8626103, -74.0574378]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                    whenCreated={map => { mapRef.current = map }}
                    zoomControl={false} // Desactivar controles de zoom predeterminados
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {userPosition && (
                        <Marker position={userPosition} icon={userLocationIcon}>
                            <Popup>Tu ubicación</Popup>
                        </Marker>
                    )}
                    {sortedVendedores.map((vendedor) => (
                        vendedor.location?.coordinates && (
                            <Marker key={vendedor.id} position={[vendedor.location.coordinates[0], vendedor.location.coordinates[1]]}>
                                <Popup>
                                    <div>
                                        <img src={vendedor.logo || logoDefault} alt="Logo del vendedor" style={{ maxWidth: "100px" }} />
                                        <br />
                                        <b>{vendedor.nombreTienda}</b>
                                        <br />
                                        <Raiting vendedorId={vendedor.vendedor_id}/>
                                        <br/>
                                        <Link to={`/cuponero/perfil-vendedor/${vendedor.vendedor_id}`}>Ver tienda</Link>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    ))}
                    <LocationMarker setUserPositionProp={setUserPosition} setUserPositionState={setUserPositionState} />
                    {selectedStore?.location?.coordinates && (
                        <SelectedStoreMarker store={selectedStore} />
                    )}
                    <CustomZoomControls />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapWithSidebar;

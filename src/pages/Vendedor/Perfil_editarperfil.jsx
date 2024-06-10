import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Perfil from "./Perfil";
import GenericModal from '../../components/Modal';
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import SocialMediaInput from "../../components/Vendedor/SocialMediaInput";
import { useAuth } from '../../services/AuthContext';
import { getVendedorById, updateVendor } from "../../services/vendedoresService";
import MapMarker from "../../components/MapMarker";
import MapLatLong from "../../components/MapLatLong";
import HorarioSelector from "../../components/Vendedor/HorarioSelector"
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"

export default function Perfil_editarPerfil() {
    const { user } = useAuth();
    const [userData, setUserData] = useState({
        nombreTienda: "",
        dirTiendaFisica: "",
        telefono: 0,
        descripcion: "",
        redesSociales: '',
        paginaWeb: "",
        horariosTiendaFisica: "",
        representanteLegal: "",
        Nit: 0,
        categorias: [], 
        location: null
    });
    const [formErrors, setFormErrors] = useState({
        storeName: '',
        phoneNumber: '',
        storeDescription: '',
        representativeName: '',
        companyNIT: '',
        categorias: [] 
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const vendedorId = user;
    const [showModalSocial, setShowModalSocial] = useState(false);
    const [showModalMap, setShowModalMap] = useState(false);
    const [socialMediaString, setSocialMediaString] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [horarios, setHorarios] = useState({});

    useEffect(() => { 
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(vendedorId);
                const userDataBd = {
                    nombreTienda: data.nombreTienda,
                    dirTiendaFisica: data.dirTiendaFisica,
                    telefono: data.telefono,
                    descripcion: data.descripcion,
                    redesSociales: data.redesSociales,
                    paginaWeb: data.paginaWeb,
                    horariosTiendaFisica: data.horariosTiendaFisica,
                    representanteLegal: data.representanteLegal,
                    Nit: data.Nit,
                    categorias: data.categorias, 
                    location: data.location
                }
                setUserData(userDataBd);
                setSocialMediaString(data.redesSociales || '');
                if (data.location && data.location.coordinates) {
                    setCoordinates(data.location.coordinates);
                }
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };
        
        fetchVendedorData();
    }, [vendedorId]);

    //////////////////////////////////////////////////////////////////////////////
    /*useEffect(() => {
        const data = JSON.parse(localStorage.getItem("laCuponeraData"));
        setUserData(data.cuponeraData);
    }, []);*/
    //////////////////////////////////////////////////////////////////////////////

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }
        try {
            const updatedData = {
                ...userData,
                horariosTiendaFisica: JSON.stringify(horarios),
                redesSociales: socialMediaString,
                location: {
                    type: "Point",
                    coordinates: coordinates,
                }
            };
            console.log("update: ", updatedData);
            await updateVendor({ vendedorId, updatedData });
            setMessage('Datos actualizados correctamente.');
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage(err.message);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (userData.nombreTienda.trim() === '') {
            errors.storeName = 'Por favor, ingresa el nombre de tu tienda';
            isValid = false;
        }

        if (String(userData.telefono).trim() === '') {
            errors.phoneNumber = 'Por favor, ingresa un número de teléfono';
            isValid = false;
        }

        if (userData.representanteLegal.trim() === '') {
            errors.representativeName = "Por favor, ingresá los datos del Representante Legal de la tienda";
            isValid = false;
        }
        if (String(userData.Nit).trim() === '') {
            errors.companyNIT="Por favor, ingresá tu Número de identificación tributaria (NIT)";
            isValid = false;
        }
        console.log("categorias:", userData.categorias)
        if (!Array.isArray(userData.categorias) || userData.categorias.length === 0) {
            errors.categorias='Por favor, selecciona al menos una categoría.';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleOpenModalSocial = () => setShowModalSocial(true);
    const handleCloseModalSocial = () => setShowModalSocial(false);
    const handleOpenModalMap = () => setShowModalMap(true);
    const handleCloseModalMap = () => setShowModalMap(false);

    const handleSaveSocialMedia = (string) => {
        setSocialMediaString(string);
        setUserData((prevUserData) => ({
            ...prevUserData,
            redesSociales: string
        }));
        handleCloseModalSocial();
        setShowModalSocial(false);
    };

    const category = [
        'Para ti', "Para los peludos", "Para disfrutar", 'Para tu paladar', 
        'Para quien amas', 'Para tu hogar', 'Para tu bienestar', 'Para tu mente', 
        'Inmobiliaria & Automotriz', 'Tecnología', 'Para tu mesa', 'Para los gobernantes', 
        'Servicios Profesionales', 'Reciclá & Ganá'
    ];

    const handleCategoryChange = (selectedList) => {
        setUserData(prevState => ({
            ...prevState,
            categorias: selectedList
        }));
    };
    
    const handleCategoryRemove = (selectedList) => {
        setUserData(prevState => ({
            ...prevState,
            categorias: selectedList
        }));
    };

    const handleSaveMapCoordinates = (coords) => {
        setCoordinates(coords);
        /*setFormData((prevUserData) => ({
            ...prevUserData,
            location: {
                type: "Point",
                coordinates: coords
            }
        }));
        console.log("Coordinates: ",formData.location.coordinates)*/
        handleCloseModalMap();
        setShowModalMap(false);
    };

    return (
        <Perfil>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    <div className="container-editar-perfil">
                                        <h2 className="mb-5 titulo-editar-perfil">Editar Datos del Usuario</h2>
                                        <form id="editStoreForm" onSubmit={handleSubmit}>
                                            <div className="row row-1-home g-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="storeName" className="form-label">
                                                        Nombre de la tienda
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${formErrors.storeName && 'is-invalid'}`}
                                                        id="storeName"
                                                        name="nombreTienda"
                                                        value={userData.nombreTienda}
                                                        onChange={handleChange}
                                                        placeholder="Ingresa el nombre de tu tienda"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formErrors.storeName}
                                                    </div>
                                                </div>
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="storeAddress" className="form-label">
                                                        Tienda Física
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${formErrors.storeAddress && 'is-invalid'}`}
                                                        id="storeAddress"
                                                        name="dirTiendaFisica"
                                                        value={userData.dirTiendaFisica}
                                                        onChange={handleChange}
                                                        placeholder="Dirección de tu tienda física"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="phoneNumber" className="form-label">
                                                        Teléfono de Contacto
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${formErrors.phoneNumber && 'is-invalid'}`}
                                                        id="phoneNumber"
                                                        name="telefono"
                                                        value={userData.telefono}
                                                        onChange={handleChange}
                                                        placeholder="Número de Contacto / Whatsapp Business"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formErrors.phoneNumber}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="storeDescription" className="form-label">
                                                        Descripción Comercial
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="storeDescription"
                                                        name="descripcion"
                                                        value={userData.descripcion}
                                                        onChange={handleChange}
                                                        rows="3"
                                                        placeholder="Quiénes son? Qué hacen?"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="horariosTiendaFisica" className="form-label">Horarios de la tienda física</label>
                                                    <div className="horario-selector-rcv">
                                                        <HorarioSelector 
                                                            horarios={horarios}
                                                            setHorarios={setHorarios}
                                                        />
                                                    </div>
                                                    <HorarioDisplay horarios={horarios} />
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="representativeName" className="form-label">Nombre y Apellidos del Representante Legal</label>
                                                    <input type="text" onChange={handleChange} value={userData.representanteLegal} name="representanteLegal" className={`form-control ${formErrors.representativeName && 'is-invalid'}`} id="representativeName" placeholder="Representante Legal" required />
                                                    <div className="invalid-feedback">{formErrors.representativeName}</div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="companyNIT" className="form-label">NIT De empresa</label>
                                                    <input type="number" onChange={handleChange} value={userData.Nit} name="Nit" className={`form-control ${formErrors.companyNIT && 'is-invalid'}`} id="companyNIT" placeholder="NIT" required />
                                                    <div className="invalid-feedback">{formErrors.companyNIT}</div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="location" className="form-label mt-2 ">Ubicación de la tienda física</label>
                                                    <br/>
                                                    <button type="button" className="btn btn-azul" onClick={handleOpenModalMap}>
                                                        Cargar Ubicación Física de la tienda
                                                    </button>
                                                    <GenericModal
                                                        show={showModalMap}
                                                        handleClose={handleCloseModalMap}
                                                        title="Cargar Ubicación Física de la tienda"
                                                    >
                                                        <MapMarker 
                                                            initialCoordinates={coordinates}
                                                            onSave={handleSaveMapCoordinates}
                                                            handleClose={handleCloseModalMap}
                                                        />
                                                    </GenericModal>
                                                    {coordinates && (
                                                        <div className="col mb-3 mt-4">
                                                            <strong>Coordenadas seleccionadas:</strong>
                                                            <MapLatLong coordinates={ coordinates } />
                                                            <p>Latitud: {coordinates[0]} Longitud: {coordinates[1]}</p>
                                                            {/* {message && <p>{message}</p>} */}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="socialMedia" className="form-label">Redes Sociales</label>
                                                    <div className="mb-3">
                                                        <button type="button" className="btn btn-rosa" onClick={handleOpenModalSocial}>
                                                            Cargar Redes Sociales
                                                        </button>
                                                    </div>
                                                    <label htmlFor="saveSocialMedia" className="form-label">Redes Sociales Guardadas:</label>
                                                    <SocialMediaDisplay socialMediaString={socialMediaString} />
                                                    <GenericModal
                                                        show={showModalSocial}
                                                        handleClose={handleCloseModalSocial}
                                                        title="Cargar Redes Sociales"
                                                    >
                                                        <SocialMediaInput onSave={handleSaveSocialMedia} />
                                                    </GenericModal>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="websiteLink" className="form-label">Página web Link</label>
                                                    <input type="text" onChange={handleChange} value={userData.paginaWeb} name="paginaWeb" className={`form-control ${formErrors.websiteLink && 'is-invalid'}`} id="websiteLink" placeholder="Link a la pagina web" />
                                                    <div className="invalid-feedback">{formErrors.websiteLink}</div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <label htmlFor="categories" className="form-label">Categorías</label>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <Multiselect
                                                        isObject={false}
                                                        onRemove={handleCategoryRemove}
                                                        onSelect={handleCategoryChange}
                                                        options={category}
                                                        selectedValues={userData.categorias && userData.categorias.map((categoria) => categoria.toString())}
                                                    />
                                                    {formErrors.categorias && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.categorias}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col col-rv-12 d-grid">
                                                <button
                                                    type="submit"
                                                    className="btn btn-amarillo"
                                                >
                                                    Guardar Cambios
                                                </button>
                                            </div>
                                            {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                                            {message && <div className="text mt-3">{message}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Perfil>
    );
}

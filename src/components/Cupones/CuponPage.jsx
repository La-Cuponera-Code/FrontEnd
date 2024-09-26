import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCouponById, getCouponImage } from "../../services/CuponesService";
import { getLogoImage, getVendedorById } from "../../services/vendedoresService";
import Cuponeros from "../Cuponero/Cuponeros";
import { useAuth } from "../../context/AuthContext";
import Vendedor from "../Vendedor/Vendedor";
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Divider } from "antd";
import coupon_default from "../../assets/coupon_default.png";
import { useCart } from "../../context/CartContext";
import useCheckIfIsLogged from '../../services/PrivateRoute';
import Raiting from '../Raiting'
import SocialShareButtons from "../SocialShareButtons";

export default function CuponPage() {
    const { authState } = useAuth();

    return (
        <>
            {authState.userType === 'vendedor' ? (
                <Vendedor>
                    <ContentPage />
                </Vendedor>
            ) : (
                <Cuponeros>
                    <ContentPage />
                </Cuponeros>
            )}
        </>
    );
}

function ContentPage() {
    const { id } = useParams();
    const [cupon, setCupon] = useState({});
    const [vendedor, setVendedor] = useState({});
    const [imageC, setImageC] = useState("");
    const [imageV, setImageV] = useState("");
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const isLogged = useCheckIfIsLogged();

    useEffect(() => {
        const fetchCuponData = async () => {
            try {
                let cuponData;
                try {
                    cuponData = await getCouponById(id);
                    setCupon(cuponData[0]);
                } catch (error) {
                    console.error('Error al obtener los datos del cupón:', error);
                }
                try {
                    const imageUrl = await getCouponImage(id);
                    setImageC(imageUrl);
                } catch (error) {
                    console.error('Error al obtener la imagen del cupón:', error);
                }
                try {
                    const vendedorData = await getVendedorById(cuponData[0].createdBy);
                    setVendedor(vendedorData);
                } catch (error) {
                    console.error('Error al obtener los datos del vendedor:', error);
                }
                try {
                    const imageUrlV = await getLogoImage(cuponData[0].createdBy);
                    setImageV(imageUrlV);
                } catch (error) {
                    console.error('Error al obtener la imagen del vendedor:', error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCuponData();
    }, [id]);

    const handleBuy = (couponId) => {
        if (isLogged) {
            addToCart(couponId);
        } else {
            navigate('/signin/cuponero')
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row square row-sm">
                <div className="col-lg-12 col-md-12">
                    <div className="card custom-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
                                    {imageC ? (
                                        <img src={imageC} alt="Cupon" className="img-fluid rounded img-cupon-cp" />
                                    ) : (
                                        <img src={coupon_default} alt="Cupon" className="img-fluid rounded img-cupon-cp" />
                                    )}
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <h3 className="titulo">{cupon.title}</h3>
                                    
                                    <div className="d-flex justify-content-between mt-3">
                                        <p className="descuento-cp">{cupon.discount}% de descuento</p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Raiting couponId={id}/>
                                    </div>
                                    <Divider/>
                                    <div className="d-flex justify-content-between">
                                        <div className="logo-name-cp d-flex flex-row align-items-center">
                                            <Avatar alt={vendedor.nombreTienda} src={imageV} size="sm" variant="outlined" />
                                            <p className="text-muted ms-2">{vendedor.nombreTienda}</p>
                                        </div>
                                        <Raiting vendedorId={vendedor.ID}/>
                                    </div>
                                    <Divider/>

                                    <p>{cupon.description}</p>
                                    
                                    <button onClick={() => handleBuy(cupon.id)} className="btn btn-amarillo mt-3 w-100">Añadir al carrito</button>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted text-center">Creado el día: {cupon.createdAt ? format(new Date(cupon.createdAt), 'MM/dd/yyyy') : '--:--'}</p>
                                        <p className="text-muted">Fecha de vencimiento: {cupon.expirationDate ? format(new Date(cupon.expirationDate), 'MM/dd/yyyy') : '--:--'}</p>
                                    </div>
                                    <div>
                                        <h4 className="titulo cuponH4">¡Comparte este cupón en tus Redes Sociales!</h4>
                                        <SocialShareButtons shareUrl={`https://lacuponera.app/cupon/${cupon.id}`} title='¡Mirá este cupón de La Cuponera!'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

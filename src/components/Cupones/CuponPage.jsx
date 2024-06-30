import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCouponById, getCouponImage } from "../../services/CuponesService";
import { getLogoImage, getVendedorById } from "../../services/vendedoresService";
import Cuponeros from "../Cuponero/Cuponeros";
import { useAuth } from "../../services/AuthContext";
import Vendedor from "../Vendedor/Vendedor";
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Divider } from "antd";

export default function CuponPage() {
    const { authState } = useAuth();

    return (
        <>
            {authState.userType === 'cuponero' ? (
                <Cuponeros>
                    <ContentPage />
                </Cuponeros>
            ) : (
                <Vendedor>
                    <ContentPage />
                </Vendedor>
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
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (!cart.includes(couponId)) {
                const updatedCart = [...cart, couponId];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                console.log('Cupón agregado al carrito:', updatedCart);
            } else {
                console.log('El cupón ya está en el carrito');
            }
        } catch (error) {
            console.error('Error al agregar el cupón al carrito:', error);
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row square row-sm">
                <div className="col-lg-12 col-md-12">
                    <div className="card custom-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <img src={imageC} alt="Cupon" className="img-fluid rounded img-cupon-cp" />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <h3 className="titulo">{cupon.title}</h3>
                                    
                                    <div className="d-flex justify-content-between mt-3">
                                        <p className="descuento-cp">{cupon.discount}% de descuento</p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Stack spacing={1} className='rating'>
                                            <Rating name="half-rating-read" defaultValue={cupon.raiting && cupon.raiting} precision={0.5} readOnly />
                                        </Stack>
                                    </div>
                                    <Divider/>
                                    <div className="d-flex justify-content-between">
                                        <div className="logo-name-cp d-flex flex-row align-items-center">
                                            <Avatar alt={vendedor.nombreTienda} src={imageV} size="sm" variant="outlined" />
                                            <p className="text-muted ms-2">{vendedor.nombreTienda}</p>
                                        </div>
                                        <Stack spacing={1} className='rating'>
                                            <Rating name="half-rating-read" defaultValue={cupon.raiting && cupon.raiting} precision={0.5} readOnly />
                                        </Stack>
                                    </div>
                                    <Divider/>

                                    <p>{cupon.description}</p>
                                    
                                    <button onClick={() => handleBuy(cupon.id)} className="btn btn-amarillo mt-3 w-100">Añadir al carrito</button>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted text-center">Creado el día: {cupon.createdAt ? format(new Date(cupon.createdAt), 'MM/dd/yyyy') : '--:--'}</p>
                                        <p className="text-muted">Fecha de vencimiento: {cupon.expirationDate ? format(new Date(cupon.expirationDate), 'MM/dd/yyyy') : '--:--'}</p>
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

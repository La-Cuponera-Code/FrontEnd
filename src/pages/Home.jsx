import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png?ver=2.0";
import descuento from "../assets/descuento.png?ver=2.0";
import cuponero from "../assets/cuponero.png?ver=2.2";
import vendedor from "../assets/vendedor.png?ver=2.2";
import x from "../assets/x.png";
import i from "../assets/icon-insta.png";
import y from "../assets/youtube.png";
import Map from "../components/Map";

export default function Home(props) {

    function cambiar(tipo) {
        const ubicacionUsuario = 'Argentina'; // Suponiendo que obtienes la ubicación del usuario de alguna manera

        if ((ubicacionUsuario === 'Colombia' || ubicacionUsuario === 'Argentina') && tipo === 'cuponero') {
            return "/signup/cuponero"; // Devuelve la ruta para Cuponero
        } else if ((ubicacionUsuario === 'Colombia' || ubicacionUsuario === 'Argentina') && tipo === 'vendedor') {
            return "/signup/vendedor"; // Devuelve la ruta para Vendedor
        } else {
            console.log('Lo sentimos, el registro solo está disponible para usuarios en Argentina o Colombia.');
            return ""; // Devuelve una cadena vacía en caso de error
        }
    }   

    return (
        <>
            <section>
                <Map />
                <div className="overlay overlay-home">
                    <div className="content content-home">
                        <div className="container container-home text-center">
                            <div className="row row-home logo-container-home">
                                <div className="col-md-12 ">
                                    <img
                                        className="img-fluid mb-3 logo-h"
                                        src={logo}
                                        alt="Logo"
                                    />
                                </div>
                            </div>
                            <div className="row row-home desc-container-home">
                                <div className="col-md-12 desc-container">
                                    <img
                                        className="img-fluid mb-3 descuento"
                                        src={descuento}
                                        alt="Descuento"
                                    />
                                </div>
                            </div>
                            <div className="row row-home btnes-container-home">
                                <div className="col-md-6 btn-container">
                                    <div className="btn-soy text-center">
                                        <div className="div-circulo">
                                            <Link to={cambiar('cuponero')} className=" btn btn-amarillo btn-lg btn-circulo">
                                                <img
                                                    src={cuponero}
                                                    alt="Cuponero"
                                                    className="img-fluid icon"
                                                />
                                            </Link>
                                        </div>
                                        <div className="soy">
                                            <h2>Soy Cuponero</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 btn-container">
                                    <div className="btn-soy text-center">
                                        <div className="div-circulo">
                                            <Link to={cambiar('vendedor')} className="btn btn-amarillo btn-lg btn-circulo">
                                                <img
                                                    src={vendedor}
                                                    alt="Vendedor"
                                                    className="img-fluid icon"
                                                />
                                            </Link>
                                        </div>
                                        <div className="soy">
                                            <h2>Soy Vendedor</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-home rgt-container-home">
                                <div className="col-md-12 mt-3">
                                    <h4 className="registro">
                                        ¿Ya tenés una cuenta?{' '}
                                        <Link
                                            to="signin/"
                                            style={{
                                                color: '#f9ec00',
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {' '}
                                            Iniciar Sesión
                                        </Link>
                                    </h4>
                                </div>
                            </div>
                            <div className="row row-home rds-container-home">
                                <div className="col-md-12 mt-3 redes">
                                    <img
                                        className="img-fluid me-3"
                                        src={x}
                                        alt="Red X"
                                    />
                                    <img
                                        className="img-fluid me-3"
                                        src={i}
                                        alt="Instagram"
                                    />
                                    <img
                                        className="img-fluid"
                                        src={y}
                                        alt="YouTube"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

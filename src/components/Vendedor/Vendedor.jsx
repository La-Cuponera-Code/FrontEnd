import React, { useState, useEffect, Children } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import NavVendedor from "./NavVendedor";
import NavVendedorMobile from "./NavVendedorMobile";
import { Link } from 'react-router-dom';
import Nav from "../Nav";
import NavConfig from "../NavConfig";

export default function Vendedor({children}) {
    const navigate = useNavigate();
    const [data, setData] = useState({});

    /*useEffect(() => {
        setData(JSON.parse(localStorage.getItem("vendedorData"))) ;
        setData(data.registroVendedor=true);
        setData(data.registroVendedorCompleto=false);
        if (data){
            // Verificar si el registro principal del vendedor está completo
            if (!data.registroVendedor) {
                console.log("Vendedor-registro ppal: ", vendedorData.registroVendedor);
                navigate("/signup/vendedor");
            } else {// Verificar si el registro total del vendedor está completo 
                if (!data.registroVendedorCompleto) {
                    console.log("Vendedor-registro total: ", vendedorData.registroVendedorCompleto);
                    navigate("/vendedor/completar-registro");
                } 
            }
        } else {
            navigate("/");
        }
    }, []);*/

    const esPantallaGrande = useMediaQuery('(min-width: 960px)');

    return (
        <>
            {esPantallaGrande ? 
                <NavVendedor>
                    <Nav children={<></>} children2={<NavConfig/>}></Nav>
                    {children}
                </NavVendedor>
            : 
                <NavVendedorMobile>
                    {children}
                </NavVendedorMobile>
            }
            
            
        </>
    );
}
import React from "react";
import Cuponeros from "../../components/Cuponero/Cuponeros"
import Carrousel from "../../components/Carrousel"
import MapStores from '../../components/MapStores'


export default function CercaAVos(props) {

    return(
        <>
            <Cuponeros>
                <div className="mt-5 ps-5 pe-5">
                    <Carrousel/>
                </div> 
                <div className="mt-5">
                    <MapStores></MapStores>
                </div>
                <div className="mt-3">
                    Vendedores destacados:
                </div>
            </Cuponeros>
        </>
    )
}
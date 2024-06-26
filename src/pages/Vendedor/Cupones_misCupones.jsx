import React, { useState, useEffect } from "react";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Cupones/ListaCupones";
import { getCoupons } from '../../services/CuponesService';
import { useAuth } from '../../services/AuthContext';

export default function Cupones_misCupones() {
    const { authState } = useAuth();
    const [cupones, setCupones] = useState([]);
    const vendedorId = authState.user;

    useEffect(() => {
        const fetchCouponsData = async () => {
            try {
                const allCoupons = await getCoupons();
                console.log("allCoupons: ", allCoupons);
                const vendorCoupons = allCoupons.filter(coupon => coupon.createdBy === vendedorId);
                console.log("vendorCoupons: ", vendorCoupons);
                setCupones(vendorCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        if (authState.userType === 'vendedor' && vendedorId) {
            fetchCouponsData();
        }
    }, [vendedorId, authState.userType]);
    return (
        <>
            <Vendedor>
                <div className="container-mis-cupones">
                    <div className="container-mis-cupones-lista">
                        <ListaCupones listaCupones={cupones}/>
                    </div>
                </div>
            </Vendedor>
        </>
    );
}
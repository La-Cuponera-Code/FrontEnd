import { useState, useEffect } from "react";
import Cuponeros from "../../components/Cuponero/Cuponeros"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../../components/Cuponero/Product";
import { productData, responsive } from "../../js/slider";
import "../../css/Cuponero/slider.css";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import { Divider } from "antd";
import { getCoupons, getMasPopulares, getMejoresPuntuados, getNewCoupons, getCouponsByPriceAsc, getCouponsByPriceDesc } from "../../services/CuponesService";

export default function Cupones() {
    const [cupones, setCupones] = useState([]);
    const [cuponesFiltered, setFilteredCupones] = useState([]);
    const [applyFilters, setApplyFilters] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");

    useEffect(() => {
        const fetchCouponsData = async () => {
            try {
                const allCoupons = await getCoupons();
                setCupones(allCoupons); // to catch initial data
                setFilteredCupones(allCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponsData();
    }, []);

    const handleFilterChange = (sectionId, value) => {
        let newFilters;

        if (applyFilters.includes(value)) {
            newFilters = applyFilters.filter(f => f !== value);
        } else {
            newFilters = [...applyFilters, value];
        }

        setApplyFilters(newFilters);
        filterCoupons(newFilters, selectedSort);
    };

    const handleSortChange = async (sortOption) => {
        setSelectedSort(sortOption);
        filterCoupons(applyFilters, sortOption);
    };

    const filterCoupons = async (filters, sortOption) => {
        let filteredData = cupones;

        // Filtrar por categorías
        if (filters.length > 0) {
            filteredData = filteredData.filter(cupon =>
                filters.every(filter => cupon.categorias.includes(filter))
            );
        }

        // Ordenar según la opción seleccionada
        if (sortOption === "Mas Populares") {
            filteredData = await getMasPopulares();
        } else if (sortOption === "Mejor Puntuados") {
            filteredData = await getMejoresPuntuados();
        } else if (sortOption === "Nuevos") {
            filteredData = await getNewCoupons();
        } else if (sortOption === "Precio: menor a mayor") {
            filteredData = await getCouponsByPriceAsc();
        } else if (sortOption === "Precio: mayor a menor") {
            filteredData = await getCouponsByPriceDesc();
        }

        setFilteredCupones(filteredData);
    };

    const product = productData.map((item, index) => (
        <Product key={index} name={item.name} url={item.imageurl} type='cupon'/>
    ));

    return (
        <>
            <Cuponeros>
                <div className="cuponerosBg p-5 mt-3">
                    <Carousel className="carousel" showDots={true} responsive={responsive}>
                        {product}
                    </Carousel>
                </div>
                <div className="p-4">
                    <div className='cuponesTxt bg-white pt-3'>
                        <h1 className='titulo'>Cupones</h1>
                        <p>Conseguí cupones de tus productos favoritos</p>
                        <Divider />
                    </div>
                    <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange}>
                        <Pagination items={cuponesFiltered} itemsPerPage={12} itemType='cupon' />
                    </Filter>
                </div>
            </Cuponeros>
        </>
    );
}

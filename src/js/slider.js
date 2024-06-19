import Gobernantes from "../assets/categorias/gobernantes.png"
import Inmobiliaria from "../assets/categorias/inmobiliaria.png"
import ParaDisfrutar from "../assets/categorias/paradisfrutar.png"
import ParaQuienAmas from "../assets/categorias/paraquienamas.png"
import ParaTi from "../assets/categorias/parati.png"
import ParaTuBienestar from "../assets/categorias/paratubienestar.png"
import ParaTuHogar from "../assets/categorias/paratuhogar.png"
import ParaTuMente from "../assets/categorias/paratumente.png"
import ParaTuMesa from "../assets/categorias/paratumesa.png"
import ParaTuPaladar from "../assets/categorias/paratupaladar.png"
import Peludos from "../assets/categorias/peludos.png"
import Recicla from "../assets/categorias/reciclaygana.png"
import Servicios from "../assets/categorias/serviciosprofesionales.png"
import Tecnologia from "../assets/categorias/tecnologia.png"

export const responsive = {
    superLargeDesktop: {
        
// the naming can be any, depends on you.
        
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
        slidesToSlide: 2,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const productData = [
    {
        id: 1,
        imageurl: Gobernantes,
        name: "Gobernantes",
    },
    {
        id: 2,
        imageurl: Inmobiliaria,
        name: "Inmobiliaria",
    },
    {
        id: 3,
        imageurl: ParaDisfrutar,
        name: "Para disfrutar",
    },
    {
        id: 4,
        imageurl: ParaQuienAmas,
        name: "Para quien amas",
    },
    {
        id: 5,
        imageurl: ParaTi,
        name: "Para ti",
    },
    {
        id: 6,
        imageurl: ParaTuBienestar,
        name: "Para tu bienestar",
    },
    {
        id: 7,
        imageurl: ParaTuHogar,
        name: "Para tu hogar",
    },
    {
        id: 8,
        imageurl: ParaTuMente,
        name: "Para tu mente",
    },
    {
        id: 9,
        imageurl: ParaTuMesa,
        name: "Para tu mesa",
    },
    {
        id: 10,
        imageurl: ParaTuPaladar,
        name: "Para tu paladar",
    },
    {
        id: 11,
        imageurl: Peludos,
        name: "Peludos",
    },
    {
        id: 12,
        imageurl: Recicla,
        name: "Recicla y gana",
    },
    {
        id: 13,
        imageurl: Servicios,
        name: "Servicios",
    },
    {
        id: 14,
        imageurl: Tecnologia,
        name: "Tecnologia",
    },
];
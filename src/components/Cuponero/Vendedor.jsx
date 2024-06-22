import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import logo from "../../assets/logo_default.png"
import { getLogoImage } from "../../services/vendedoresService";

export default function Vendedor(vendedor) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageUrl = await getLogoImage(vendedor._id);
                setImage(imageUrl);
            } catch (error) {
                console.error('Error al obtener la imagen del cupón:', error);
            }
        };

        if (vendedor._id) {
            fetchImage();
        }
    }, [vendedor._id]);

    return ( 
        <Link to={`/cuponero/perfil-vendedor/${vendedor._id}`}>
            <div className="flex items-center vendedor-lt product-grid-lc">
                <img className="rounded-full" src={vendedor.logo ? vendedor.logo : logo} alt="" />
                <div className="categoria-lc w-100">{vendedor.categorias ? vendedor.categorias.join(', ') : 'Categorias'}</div>
                <div>
                    <h3 className="text-base text-center font-semibold leading-7 tracking-tight text-gray-900">{vendedor.nombreTienda}</h3>
                    <Stack spacing={1} className='rating'>
                        <Rating name="half-rating-read" defaultValue={vendedor.raiting && vendedor.raiting} precision={0.5} readOnly />
                    </Stack>
                </div>
            </div>
        </Link>
    );
}
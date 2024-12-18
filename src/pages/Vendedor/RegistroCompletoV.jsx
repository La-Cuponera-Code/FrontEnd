import React, { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Multiselect from "multiselect-react-dropdown";
import cuponik from "../../assets/cuponik/CuponicSaludo3-derecha.gif";
import GenericModal from '../../components/Modal';
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import SocialMediaInput from "../../components/Vendedor/SocialMediaInput";
import { useAuth } from "../../context/AuthContext";
import { getVendedorById, updateVendor } from "../../services/vendedoresService";
import Vendedor from "../../components/Vendedor/Vendedor";
import MapMarker from "../../components/MapMarker";
import MapLatLong from "../../components/MapLatLong";
import CambiarPlan from "../../components/Planes/CambiarPlan";
import HorarioSelector from "../../components/Vendedor/HorarioSelector"
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"

export default function RegistroCompletoV(props) {
    const intl = useIntl();
    const { user, authState } = useAuth();
    const [formData, setFormData] = useState({
        redesSociales: "",
        paginaWeb: "",
        horariosTiendaFisica: "",
        representanteLegal: "",
        Nit: '',
        raiting: 0,
        categorias: [],
        seguidores: [],
        location: null,
        Segundo_Registro: 0
    });
    const [formErrors, setFormErrors] = useState({
        representativeName: '',
        companyNIT: 0,
        categorias: []  
    });
    const [errorMessage, setErrorMessage] = useState('');

    const vendedorId = String(user);
    
    const [showModalSocial, setShowModalSocial] = useState(false);
    const [showModalMap, setShowModalMap] = useState(false);
    const [socialMediaString, setSocialMediaString] = useState('');
    const navigate = useNavigate();
    const [showPlanSelection, setShowPlanSelection] = useState(true);
    const [showCategories, setShowCategories] = useState(false);
    const [coordinates, setCoordinates] = useState([4.8626103, -74.0574378]);
    const [currentPlan, setCurrentPlan] = useState(0);
    const [horarios, setHorarios] = useState({});

    useEffect(() => {
        const fetchVendedorData = async () => {
            try {
                const data_email = await getVendedorById(vendedorId);
                const dat = await getVendedorById(vendedorId, 'Complete');
                const data = dat[0];
                setSocialMediaString(data.redesSociales || "");
                setCurrentPlan(data_email.plan);
                if (data.location && data.location.coordinates && data.location.coordinates[0] && data.location.coordinates[1]) {
                    setCoordinates(data.location.coordinates);
                }
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };
        
        fetchVendedorData();
    }, [currentPlan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'Nit' ? Number(value) : value // Convert Nit to number
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) return;

        try {
            try {
                const updatedDataC = {
                    ...formData,
                    horariosTiendaFisica: JSON.stringify(horarios),
                    redesSociales: socialMediaString,
                    location: {
                        type: "Point",
                        coordinates: coordinates,
                    },
                    Segundo_Registro: 1
                };
                await updateVendor(vendedorId, updatedDataC, 'Complete');
                window.location.reload()
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage(intl.formatMessage({ id: 'error_updating_seller', defaultMessage: 'Error actualizando vendedor' }));
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(intl.formatMessage({ id: 'internal_server_error', defaultMessage: 'Error interno del servidor' }));
        }
        
    };

    const handleNext = () => {
        const isValid = validateForm();
        if (isValid) {
            setShowCategories(true);
        } else 
            return;  
    };

    const handleNextPlan = () => {
        const isValid = validateFormPlan();
        if (isValid) {
            setShowPlanSelection(false);
        } else 
            setShowPlanSelection(true);
            return;  
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        // Validar cada campo
        if (formData.representanteLegal.trim() === '') {
            errors.representativeName = intl.formatMessage({ id: 'legal_representative_error_message', defaultMessage: 'Por favor, ingresá los datos del Representante Legal de la tienda' });
            isValid = false;
        }
        if (formData.Nit === 0) {
            errors.companyNIT = intl.formatMessage({ id: 'nit_error_message', defaultMessage: 'Por favor, ingresá tu Número de identificación tributaria (NIT)' });
            isValid = false;
        }
        if (showCategories &&  (!Array.isArray(formData.categorias) || formData.categorias.length === 0)) {
            errors.categorias= intl.formatMessage({ id: 'category_error_message', defaultMessage: 'Por favor, selecciona al menos una categoría' });
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const validateFormPlan = () => {
        let isValid = true;
        const errors = {};
        // Validar cada campo
        if (currentPlan === 0 || currentPlan === null) {
            setErrorMessage(intl.formatMessage({ id: 'select_plan_error_message', defaultMessage: 'Por favor, selecciona un plan antes de continuar.' }));
            isValid = false;
            setFormErrors('');
        }
        setFormErrors(errors);
        return isValid;
    }

    const scrollToForm = () => {
        const formElement = document.getElementById('containerFormV');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    };

    const categoryOptions = [
        intl.formatMessage({ id: 'for_you', defaultMessage: 'Para ti' }),
        intl.formatMessage({ id: 'pets', defaultMessage: 'Para los peludos' }),
        intl.formatMessage({ id: 'to_enjoy', defaultMessage: 'Para disfrutar' }),
        intl.formatMessage({ id: 'for_your_palate', defaultMessage: 'Para tu paladar' }),
        intl.formatMessage({ id: 'for_who_you_love', defaultMessage: 'Para quien amas' }),
        intl.formatMessage({ id: 'for_your_home', defaultMessage: 'Para tu hogar' }),
        intl.formatMessage({ id: 'for_your_wellbeing', defaultMessage: 'Para tu bienestar' }),
        intl.formatMessage({ id: 'for_your_mind', defaultMessage: 'Para tu mente' }),
        intl.formatMessage({ id: 'real_estate', defaultMessage: 'Inmobiliaria & Automotriz' }),
        intl.formatMessage({ id: 'technology', defaultMessage: 'Tecnología' }),
        intl.formatMessage({ id: 'for_your_table', defaultMessage: 'Para tu mesa' }),
        intl.formatMessage({ id: 'rulers', defaultMessage: 'Para los gobernantes' }),
        intl.formatMessage({ id: 'services', defaultMessage: 'Servicios Profesionales' }),
        intl.formatMessage({ id: 'recycle_and_earn', defaultMessage: 'Reciclá & Ganá' })
    ];

    const handleCategoryChange = (selectedList) => {
        setFormData(prevState => ({
            ...prevState,
            categorias: selectedList
        }));
    };
    
    const handleCategoryRemove = (selectedList) => {
        setFormData(prevState => ({
            ...prevState,
            categorias: selectedList
        }));
    };
    
    const handleOpenModalSocial = () => setShowModalSocial(true);
    const handleCloseModalSocial = () => setShowModalSocial(false);
    const handleOpenModalMap = () => setShowModalMap(true);
    const handleCloseModalMap = () => setShowModalMap(false);

    const handleSaveSocialMedia = (string) => {
        setSocialMediaString(string);
        setFormData((prev) => ({
            ...prev,
            redesSociales: string
        }));
        handleCloseModalSocial();
        setShowModalSocial(false);
    };

    const handleSaveMapCoordinates = (coords) => {
        setCoordinates(coords);
        /*setFormData((prev) => ({
            ...prev,
            location: {
                type: "Point",
                coordinates: coords
            }
        }));
        console.log("Coordinates: ",formData.location.coordinates)*/
        handleCloseModalMap();
        setShowModalMap(false);
    };

    return(
        <>            
            <div className=" row row-titulo-v justify-content-center cuponikBanner">
                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-12 mx-auto col-titulo-v">
                    <div className="container-titulo-v mb-lg-9< text-center">
                        <h1 className="mb-1 h2 fw-bold titulo titulo-v cuponikH1">{intl.formatMessage({ id: 'welcome_seller', defaultMessage: '¡Bienvenido Vendedor!' })}</h1>
                        <h5 className="mb-lg-4 text-v">{intl.formatMessage({ id: 'welocome_seller_text', defaultMessage: 'Estás a unos pocos pasos de ofrecer tus cupones y formar parte de esta gran comunidad.' })}</h5>
                        
                    </div>
                    <div className="boton-flecha-v">
                        <p id="subtitulo" className="subtitulo-v text-center">
                            {intl.formatMessage({ id: 'complete_registration', defaultMessage: 'Completa tu registro para empezar a cargar tus cupones' })}
                        </p>
                        <button onClick={scrollToForm} className="scroll-btn">
                            <i className="bi bi-chevron-down"></i>
                        </button>
                    </div>
                </div>  
                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-12 mx-auto col-cuponik-v">
                    <div>
                        <img className="cuponik-saludo" src={cuponik} />
                    </div>
                </div>
            </div>  
            <div id="containerFormV" className="row row-formulario-v justify-content-center align-items-center">
                <div className={`formulario-vendedor col-11 mx-auto ${showPlanSelection ? '' : 'd-none'}`}>
                    <CambiarPlan currentPlan={currentPlan}/>
                    <div className="col-12 d-grid">
                        <button type="button" onClick={handleNextPlan} className="btn btn-amarillo">{intl.formatMessage({ id: 'next', defaultMessage: 'Siguente' })}</button>
                    </div>
                    {errorMessage && <div className="mt-3" style={{ color: 'white' }}>{errorMessage}</div>}
                </div>
                <div className={`formulario-vendedor col-10 mx-auto ${showCategories ? 'd-none' : ''}${showPlanSelection ? 'd-none' : ''}`}>
                    <div className="text-center mb-4">
                        <h1 className="titulo titulo-form-rcv fs-80">{intl.formatMessage({ id: 'register_my_store', defaultMessage: 'Registrar mi tienda' })}</h1>
                        <p>{intl.formatMessage({ id: 'store_registration_text', defaultMessage: 'Queremos conocerte un poco más, por favor completá los siguientes datos para poder ofrecerte la mejor experiencia.' })}</p>
                    </div>
                    <form className="content-form2-rcv"> 
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="representativeName" className="form-label">
                                    {intl.formatMessage({ id: 'legal_representative_name', defaultMessage: 'Nombre y Apellidos del Representante Legal' })}
                                </label>
                                <input 
                                    type="text" 
                                    onChange={handleChange} 
                                    value={formData.representanteLegal} 
                                    name="representanteLegal" 
                                    className={`form-control ${formErrors.representativeName && 'is-invalid'}`} 
                                    id="representanteLegal" 
                                    placeholder={intl.formatMessage({ id: 'legal_representative', defaultMessage: 'Representante Legal' })} 
                                    required 
                                />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.representativeName}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="companyNIT" className="form-label">
                                    {intl.formatMessage({ id: 'company_nit', defaultMessage: 'NIT De empresa' })}
                                </label>
                                <input 
                                    type="number" 
                                    onChange={handleChange} 
                                    value={formData.Nit} 
                                    name="Nit" 
                                    className={`form-control ${formErrors.companyNIT && 'is-invalid'}`} 
                                    id="Nit" 
                                    placeholder={intl.formatMessage({ id: 'nit', defaultMessage: 'NIT' })}
                                    required 
                                />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.companyNIT}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="horariosTiendaFisica" className="form-label">{intl.formatMessage({ id: 'store_hours', defaultMessage: 'Horarios de la tienda física' })}</label>
                                <div className="horario-selector-rcv">
                                    <HorarioSelector 
                                        horarios={horarios}
                                        setHorarios={setHorarios}
                                    />
                                </div>
                                {intl.formatMessage({ id: 'saved_schedules', defaultMessage: 'Horarios guardados:' })}
                                <HorarioDisplay horarios={horarios} />
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3 mt-3">
                                <label htmlFor="location" className="form-label mt-2 ">{intl.formatMessage({ id: 'store_location', defaultMessage: 'Ubicación de la tienda física' })}</label>
                                <br/>
                                <button type="button" className="btn btn-azul" onClick={handleOpenModalMap}>
                                    {intl.formatMessage({ id: 'load_physical_store_location', defaultMessage: 'Cargar Ubicación Física de la tienda' })}
                                </button>
                                <GenericModal
                                    show={showModalMap}
                                    handleClose={handleCloseModalMap}
                                    title={intl.formatMessage({ id: 'load_physical_store_location', defaultMessage: 'Cargar Ubicación Física de la tienda' })}
                                >
                                    <MapMarker 
                                        initialCoordinates={coordinates}
                                        onSave={handleSaveMapCoordinates}
                                        handleClose={handleCloseModalMap}
                                    />
                                </GenericModal>
                                {coordinates && (
                                    <div className="col mb-3 mt-4">
                                        <strong>{intl.formatMessage({ id: 'selected_coordinates', defaultMessage: 'Coordenadas seleccionadas: ' })}</strong>
                                        <MapLatLong coordinates={coordinates} />
                                        <p>{intl.formatMessage({ id: 'latitude', defaultMessage: 'Latitud: ' })} {coordinates[0]} {intl.formatMessage({ id: 'longitude', defaultMessage: 'Longitud:' })} {coordinates[1]}</p>
                                        {/* {message && <p>{message}</p>} */}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 d-grid">
                            <button type="button" onClick={handleNext} className="btn btn-amarillo">{intl.formatMessage({ id: 'next', defaultMessage: 'Siguente' })}</button>
                        </div>
                        {errorMessage && <div className="mt-3" style={{ color: 'white' }}>{errorMessage}</div>}
                    </form>
                </div>
                <div className={`formulario-vendedor col-10 mx-auto ${!showCategories ? 'd-none' : ''}`}>
                    <form>
                        <div className="row g-3">
                            <div className="col mb-3 completar-registro-social">
                                <label htmlFor="socialMedia" className="form-label">
                                    {intl.formatMessage({ id: 'social_media', defaultMessage: 'Redes Sociales' })}
                                </label>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-amarillo" onClick={handleOpenModalSocial}>
                                    {intl.formatMessage({ id: 'upload_social_media', defaultMessage: 'Cargar Redes Sociales' })}
                                    </button>
                                </div>
                                <label htmlFor="saveSocialMedia" className="form-label">
                                {intl.formatMessage({ id: 'saved_social_media', defaultMessage: 'Redes Sociales Guardadas:' })}
                                </label>
                                <SocialMediaDisplay socialMediaString={socialMediaString} />
                                <GenericModal
                                    show={showModalSocial}
                                    handleClose={handleCloseModalSocial}
                                    title={intl.formatMessage({ id: 'upload_social_media', defaultMessage: 'Cargar Redes Sociales' })}
                                >
                                    <SocialMediaInput onSave={handleSaveSocialMedia} />
                                </GenericModal>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="websiteLink" className="form-label">
                                    {intl.formatMessage({ id: 'website_link', defaultMessage: 'Página web Link' })}
                                </label>
                                <input 
                                    type="text" 
                                    onChange={handleChange} 
                                    value={formData.paginaWeb} 
                                    name="paginaWeb" 
                                    className={`form-control ${formErrors.websiteLink && 'is-invalid'}`} 
                                    id="paginaWeb" 
                                    placeholder={intl.formatMessage({ id: 'website_link_text', defaultMessage: 'Link a la pagina web' })}
                                />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.websiteLink}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <label htmlFor="categories" className="form-label">
                                {intl.formatMessage({ id: 'categories', defaultMessage: 'Categorías' })}
                            </label>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <Multiselect
                                    isObject={false}
                                    onRemove={handleCategoryRemove}
                                    onSelect={handleCategoryChange}
                                    options={categoryOptions}
                                    selectedValues={formData.categorias && formData.categorias.map((categoria) => categoria.toString())}
                                />
                                {formErrors.categorias && (
                                    <div className="invalid-feedback d-block" style={{ color: 'white' }}>
                                        {formErrors.categorias}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-12 d-grid">
                            <button type="submit"  id="registro" onClick={handleRegister} className="btn btn-amarillo">
                                {intl.formatMessage({ id: 'signup', defaultMessage: 'Registrar' })}
                            </button>
                        </div>
                        {errorMessage && <div className="mt-3" style={{ color: 'white' }}>{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </>
    )
}


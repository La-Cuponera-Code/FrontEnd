import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/logo.png";
import Nav from "../Nav";
import NavConfigMobile from "../NavConfigMobile";
import { FaHome, FaBars, FaUserAlt, FaRegChartBar, FaRegCreditCard } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

export default function NavVendedorMobile({ children, disableButtons }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Estado para controlar qué menú desplegable está abierto
    const navigate = useNavigate(); // Hook para navegar programáticamente

    const toggleDropdown = (index, item) => {
        if (item.dropdown) {
            setOpenDropdown(openDropdown === index ? null : index);
        } else {
            navigate(item.path);
        }
    };

    const menuItem = [
        { path: "/vendedor/", name: "Inicio", icon: <FaHome /> },
        { path: "/vendedor/perfil/vista-previa", name: "Perfil", icon: <FaUserAlt /> },
        { path: "/vendedor/estadisticas", name: "Estadísticas", icon: <FaRegChartBar /> },
        { path: "/vendedor/cupones/mis-cupones", name: "Mis Cupones", icon: <MdLocalOffer /> },
        { path: "/vendedor/pagos/cambiar-plan", name: "Pagos y suscripciones", icon: <FaRegCreditCard /> }
    ];

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    return (
        <>
            <Nav 
                children={
                    <button className="btn btn-primary" type="button" onClick={handleShow} aria-disabled={disableButtons}>
                        <FaBars />
                    </button>
                } 
                children2={<NavConfigMobile />}
            />
            <Offcanvas className="sidebar-nav-mobile" show={showSidebar} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <Link to="/" className={`navbar-brand ${disableButtons ? 'disabled' : ''}`} style={{ display: showSidebar ? "block" : "none" }}>
                            <img src={logo} alt="La Cuponera" className="d-inline-block align-text-top logo-sidebar" />
                        </Link>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {menuItem.map((item, index) => (
                        <div key={index}>
                            <div 
                                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''} ${disableButtons ? 'disabled' : ''}`}
                                onClick={() => toggleDropdown(index, item)}
                                style={disableButtons ? { pointerEvents: 'none' } : {}}
                            >
                                <div className="icon-sidebar">{item.icon}</div>
                                <div className="sidebar-link_text">{item.name}</div>
                            </div>
                        </div>
                    ))}
                </Offcanvas.Body>
                <div className="p-2 footer-nvm">
                    <NavConfigMobile />
                </div>
            </Offcanvas>
            <div className="content-sidebar mt-3">
                {children}
            </div>
        </>
    );
}

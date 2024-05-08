import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap"

export default function SignInMicroservicios(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userType, setUserType] = useState(""); // Estado para almacenar el tipo de usuario seleccionado
    const navigate = useNavigate(); 

    // Función para manejar el inicio de sesión
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:9000/${userType === 'vendedor' ? 'vendedor' : 'cuponero'}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // Manejar la respuesta según sea necesario
                localStorage.setItem('userData', JSON.stringify(data));
                navigate(`/thank-you/${userType}`);

            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }
    };

    // Funciones para manejar los clics en los botones de tipo de usuario
    const handleVendedorClick = () => {
        setUserType('vendedor');
    };

    const handleCuponeroClick = () => {
        setUserType('cuponero');
    };

    return(
        <>
        <ContainerMap title="Ingresá a Cuponera" subtitle="¡Bienvenido de nuevo a Cuponera! Ingresá tu correo electrónico para comenzar" isSignIn="registro" >
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <div className="row fila-sg g-3 align-items-center justify-content-center">
                <div className="col-12">
                    Ingresar como:
                </div>
                <div className="col-6 btn-microservicios">
                    <button onClick={handleVendedorClick} className={ userType === 'vendedor' ? 'selected' : ''}>
                        Vendedor
                    </button>
                </div>
                <div className="col-6 btn-microservicios">
                    <button onClick={handleCuponeroClick} className={userType === 'cuponero' ? 'selected' : ''}>
                        Cuponero
                    </button>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="needs-validation">
                <div className="row fila-sg g-3">
                    
                    <div className="col-12">
                        <label htmlFor="formSigninEmail" className="form-label visually-hidden">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="formSigninEmail" placeholder="Email" required />
                        <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                    </div>
                    <div className="col-12">
                        <div className="password-field position-relative">
                            <label htmlFor="formSigninPassword" className="form-label visually-hidden">Contraseña</label>
                            <div className="password-field position-relative">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="form-control fakePassword" id="formSigninPassword" placeholder="********" required />
                                <span  className="eye-icon-container"><i className="bi bi-eye-slash passwordToggler"></i></span>
                                <div className="invalid-feedback">Por favor, ingresá tu contraseña</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Recordarme</label>
                        </div>
                        <div>
                            <Link style={{ color:"#0088ff"}} to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                    <div className="col-12 d-grid">
                        <button type="submit" id="sesion" className="btn btn-amarillo">Iniciar Sesión</button>
                    </div>
                <div>¿Aún no tenés una cuenta? <Link to="/" style={{ color: '#0088ff'}}>Registrarse</Link></div>
                </div>
            </form>
        </ContainerMap>
        </>
    )
}

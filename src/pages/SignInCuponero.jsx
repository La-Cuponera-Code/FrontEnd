import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap";
import { useAuth } from '../context/AuthContext';
import { checkIfUserIsLogged } from "../utils/controlSession";

export default function SignIn() {
    /*checkIfUserIsLogged();*/

    const [credentialsCuponero, setCredentialsCuponero] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentialsCuponero(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(credentialsCuponero, 'cuponero');
            navigate(`/`);
            //navigate(`/thank-you/${userType}`);
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return(
        <>
        <ContainerMap title="Ingresá a Cuponera" subtitle="¡Bienvenido de nuevo a Cuponera! Ingresá tu correo electrónico y conseguí los cupones de tus productos favoritos" isSignIn="registro-tienda" >
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="needs-validation">
                <div className="row fila-sg g-3">
                    <div className="col-12">
                        <label htmlFor="formSigninEmail" className="form-label visually-hidden">Email</label>
                        <input type="email" name="email" value={credentialsCuponero.email} onChange={handleChange} className="form-control" id="formSigninEmail" placeholder="Email" required />
                        <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                    </div>
                    <div className="col-12">
                        <div className="password-field position-relative">
                            <label htmlFor="formSigninPassword" className="form-label visually-hidden">Contraseña</label>
                            <div className="password-field position-relative">
                                <input type={showPassword ? "text" : "password"} name={"password"} value={credentialsCuponero.password} onChange={handleChange}  className="form-control fakePassword" id="formSigninPassword" placeholder="********" required />
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="showPasswordCheck"
                                            checked={showPassword}
                                            onChange={() => setShowPassword(!showPassword)}
                                        />
                                        <label className="form-check-label" htmlFor="showPasswordCheck">
                                            Mostrar contraseña
                                        </label>
                                    </div>
                                    <div className="invalid-feedback">Por favor, ingresá tu contraseña</div>
                                    <Link style={{ color:"#0088ff"}} to="/forgot-password/cuponero">¿Olvidaste tu contraseña?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-grid mb-3">
                        <button type="submit" id="sesion" className="btn btn-amarillo">Iniciar Sesión</button>
                    </div>
                    <div className="border-top"></div>
                    <div className="d-flex flex-column align-items-center justify-content-center mt-4 mb-2">
                        ¿Aún no tenés una cuenta?
                        <Link to="/signup/cuponero" className="btn btn-azul mt-3 w-100">Registrarse</Link>
                    </div>
                </div>
            </form>
        </ContainerMap>
    </> 
    )
}

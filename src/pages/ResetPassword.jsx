import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContainerMap from "../components/ContainerMap";
import { getCuponeros, updateCuponero } from "../services/cuponerosService";
import { getVendedores, updateVendor } from "../services/vendedoresService";

export default function ResetPassword() {
    const { token, userType } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const findUserByToken = async () => {
            try {
                if (userType === 'cuponero') {
                    const cuponeros = await getCuponeros();
                    const user = cuponeros.find(cuponero => cuponero.tokenLink === token);
                    if (user) {
                        setUserId(user.id);
                    } else {
                        setErrorMessage('Token inválido o usuario no encontrado.');
                    }
                } else {
                    const vendedores = await getVendedores();
                    const user = vendedores.find(vendedor => vendedor.tokenLink === token);
                    if (user) {
                        setUserId(user.id);
                    } else {
                        setErrorMessage('Token inválido o usuario no encontrado.');
                    }
                }
            } catch (error) {
                setErrorMessage('Error al buscar el usuario.');
            }
        };

        findUserByToken();
    }, [token, userType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            if (userType === 'cuponero' && userId) {
                await updateCuponero(userId, { password });
                setSuccessMessage('Contraseña restablecida con éxito.');
            } else if (userType === 'vendedor' && userId) {
                await updateVendor(userId, { user_pass: password });
                setSuccessMessage('Contraseña restablecida con éxito.');
            } else {
                setErrorMessage('Error al restablecer la contraseña');
            }
        } catch (error) {
            setErrorMessage('Error al restablecer la contraseña');
        }
    };

    return (
        <>
            <ContainerMap title="Restablecer Contraseña" subtitle="Ingresa tu nueva contraseña." isSignIn="registro">
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="formNewPassword" className="form-label">Nueva Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="formNewPassword" 
                                placeholder="Nueva Contraseña" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <div className="invalid-feedback">Por favor, ingresá tu nueva contraseña</div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="formConfirmPassword" className="form-label">Confirmar Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="formConfirmPassword" 
                                placeholder="Confirmar Contraseña" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                            <div className="invalid-feedback">Por favor, confirmá tu nueva contraseña</div>
                        </div>
                        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                        <div className="col-12 d-grid gap-2">
                            <button type="submit" className="btn btn-rosa">Restablecer contraseña</button>
                        </div>
                    </div>
                </form>
            </ContainerMap>
        </>
    );
}

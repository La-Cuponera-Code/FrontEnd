// src/servicesService.js
import { API_BASE_URL_VENDEDORES } from '../../config';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }
    return response.json();
};

export const getVendedores = async () => {
    const response = await fetch(`${API_BASE_URL_VENDEDORES}`);
    return handleResponse(response);
};

export const getVendedorById = async (id) => {
    const response = await fetch(`${API_BASE_URL_VENDEDORES}/${id}`);
    return handleResponse(response);
};

export const registerVendedor = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDORES}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en registerVendedor:', error);
        throw error;
    }
};

export const loginVendedor = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDORES}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en registerVendedor:', error);
        throw error;
    }
};

export const updateVendedor = async (id, userData) => {
    const response = await fetch(`${API_BASE_URL_VENDEDORES}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const deleteVendedor = async (id) => {
    const response = await fetch(`${API_BASE_URL_VENDEDORES}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

//enviar mail de verificacion
export const sendVerificationEmailV = async (email) => {
    try {
        const response = await fetch('/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error interno del servidor al enviar el correo de verificación.' };
    }
};

//verificar token ingresado por el usuario
export const verifyTokenV = async (email, token) => {
    try {
        const response = await fetch('/verify', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error interno del servidor al verificar el token.' };
    }
};

export const uploadPortada = async (id, imagen) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imagen);

        const response = await fetch(`${API_BASE_URL_VENDEDORES}/${id}/portada`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload cover image');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading cover image:', error);
        throw error;
    }
};

export const uploadLogo = async (id, imagen) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imagen);

        const response = await fetch(`${API_BASE_URL_VENDEDORES}/${id}/logo`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload logo image');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading logo image:', error);
        throw error;
    }
};
const API_BASE_URL_VENDEDOR = import.meta.env.VITE_API_BASE_URL_VENDEDOR;

export const getVendedores = async (Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const url = `${API_BASE_URL_VENDEDOR}/vendedores${Complete}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al obtener los vendedores');
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener los vendedores:', error);
        throw error;
    }
};


export const getVendedorById = async (id, Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/vendedores${Complete}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el vendedor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el vendedor:', error);
        throw error;
    }
};

export const createVendor = async (vendorData, Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/vendedores${Complete}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendorData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el vendedor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el vendedor:', error);
        throw error;
    }
};

export const updateVendor = async (id, vendorData, Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const url = `${API_BASE_URL_VENDEDOR}/vendedores${Complete}/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendorData)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el vendedor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el vendedor:', error);
        throw error;
    }
};

export const deleteVendor = async (id, Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/vendedores${Complete}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el vendedor');
        }
        return { message: 'Vendedor eliminado correctamente' };
    } catch (error) {
        console.error('Error al eliminar el vendedor:', error);
        throw error;
    }
};

export const getPlan = async (id) => {
    const dataplan = await getVendedorById(id);
    return dataplan.plan;
};

export const uploadImage = async (id, imageFile, imageType) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);

        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/${id}/${imageType}`, {
            method: 'POST',
            body: formData,
        });

        if (response.status === 404) {
            return { status: 404, data: null };
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la carga de la imagen: ${errorText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Error interno del servidor al cargar la imagen.');
    }
};

export const requestPasswordReset = async (vendedorData,id) => {
    const response = await fetch(`${API_BASE_URL_VENDEDOR}/vendedores/recovery/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vendedorData)
    });
    if (!response.ok) {
        throw new Error('Error al solicitar restablecimiento de contraseña');
    }
    return await response.json();
};

// Función para obtener video por ID de vendedor
export const getVideoById = async (idVendedor) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/videos/${idVendedor}`, {
            method: 'GET',
        });

        if (response.status === 404) {
            return { status: 404, data: null };
        }

        if (!response.ok) {
            throw new Error(`Error al obtener el video: ${response.statusText}`);
        }
        const videoBlob = await response.blob();
        return URL.createObjectURL(videoBlob);
    } catch (error) {
        console.error('Error obteniendo el video:', error);
        throw error;
    }
};

// Función para subir video por ID de vendedor
export const uploadVideo = async (idVendedor, formData) => {
    try {

        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/videos/${idVendedor}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error al subir el video: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error subiendo el video:', error);
        throw error;
    }
};

export const deleteVideo = async (idVendedor) => {
    const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/videos/${idVendedor}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error deleting video');
    }

    return await response.json();
};

// Funciones para manejar imágenes de logos

export const getLogoImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/logos/${id}`, {
            headers: {
                'Content-Type': 'image'
            }
        });

        if (response.status === 404) {
            return { status: 404, data: null };
        }

        if (!response.ok) {
            throw new Error(response.error);
        }
        const blob = await response.blob(); // Obtener la imagen como un blob
        return URL.createObjectURL(blob); // Crear una URL de objeto para la imagen
    } catch (error) {
        console.error('Error al obtener la imagen del logo:', error);
        throw error;
    }
};

export const uploadLogoImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/logos/${id}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al subir la imagen del logo');
        }
         // Obtener la imagen como un blob
        return await response.json(); // Crear una URL de objeto para la imagen
    } catch (error) {
        console.error('Error al subir la imagen del logo:', error);
        throw error;
    }
};

/*export const updateLogoImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/logos/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la imagen del logo');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar la imagen del logo:', error);
        throw error;
    }
};*/

export const updateLogoImage = async (existingImage = null, id, imageFile) => {
    try {
        if(existingImage){
            await deleteLogoImage(id)
        }
        await uploadLogoImage(id, imageFile)
    } catch (error) {
        console.error('Error al actualizar la imagen del logo:', error);
        throw error;
    }
};

export const deleteLogoImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/logos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(response.error);
        }
        return { message: 'Imagen del logo eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la imagen del logo:', error);
        throw error;
    }
};

// Funciones para manejar imágenes de portadas

export const getCoverImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/portadas/${id}`, {
            headers: {
                'Content-Type': 'image'
            }
        });

        if (response.status === 404) {
            return { status: 404, data: null };
        }

        if (!response.ok) {
            throw new Error(response.error);
        }
        const blob = await response.blob(); // Obtener la imagen como un blob
        return URL.createObjectURL(blob); // Crear una URL de objeto para la imagen
    } catch (error) {
        console.error('Error al obtener la imagen de la portada:', error);
        throw error;
    }
};

export const uploadCoverImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/portadas/${id}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al subir la imagen de la portada');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al subir la imagen de la portada:', error);
        throw error;
    }
};

/*export const updateCoverImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/portadas/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la imagen de la portada');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar la imagen de la portada:', error);
        throw error;
    }
};*/

export const updateCoverImage = async (existingImage = null, id, imageFile) => {
    try {
        if(existingImage){
            await deleteCoverImage(id);
        }
        await uploadCoverImage(id, imageFile)
    } catch (error) {
        console.error('Error al actualizar la imagen del logo:', error);
        throw error;
    }
};

export const deleteCoverImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/portadas/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la imagen de la portada');
        }
        return { message: 'Imagen de la portada eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la imagen de la portada:', error);
        throw error;
    }
};
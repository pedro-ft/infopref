import api from './api';

const API_BASE_URL = 'departamentos';

export const getAllDepartamentos = async () => {
    try {
        const response = await api.get(API_BASE_URL)
        if (response.status !== 200) {
            throw new Error('Failed to get departamentos');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar departamentos: ', error);
        throw error;
    }
}
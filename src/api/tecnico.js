import api from './api'; // Importe a instância do axios

const API_BASE_URL = 'tecnicos';

export const getAllTecnicos = async () => {
    try {
        const response = await api.get(API_BASE_URL)
        if (response.status !== 200) {
            throw new Error('Failed to get tecnicos');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tecnicos: ', error);
        throw error;
    }
}
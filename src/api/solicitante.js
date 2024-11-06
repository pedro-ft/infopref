import api from './api';

const API_BASE_URL = 'solicitantes';

export const getAllSolicitantes = async () => {
    try {
        const response = await api.get(API_BASE_URL)
        if (response.status !== 200) {
            throw new Error('Failed to get solicitantes');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar solicitantes: ', error);
        throw error;
    }
}
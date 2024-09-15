import api from './api'; // Importe a instância do axios

const API_BASE_URL = 'secretarias';

export const getAllSecretarias = async () => {
    try {
        const response = await api.get(API_BASE_URL)
        if (response.status !== 200) {
            throw new Error('Failed to get secretarias');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar secretarias: ', error);
        throw error;
    }
}
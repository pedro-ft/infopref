import api from './api'; // Importe a instância do axios

const API_BASE_URL = 'infoInternet';

export const getAllInfoInternet = async () => {
    try {
        const response = await api.get(API_BASE_URL)
        if (response.status !== 200) {
            throw new Error('Failed to get infoInternet');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar informacoes de internet: ', error);
        throw error;
    }
}
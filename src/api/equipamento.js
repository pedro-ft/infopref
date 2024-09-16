import api from './api'; // Importe a instância do axios

const API_BASE_URL = 'equipamentos';

export const getAllEquipamentos = async () => {
    try {
        const response = await api.get(API_BASE_URL)
        if (response.status !== 200) {
            throw new Error('Failed to get equipamentos');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar equipamentos: ', error);
        throw error;
    }
}
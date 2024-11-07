import api from './api';

const API_BASE_URL = 'osmenu';

export const getAllOrdemServico = async () => {
    try {
        const response = await api.get(API_BASE_URL)
        if (response.status !== 200) {
            throw new Error('Failed to get ordemServico');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ordens de servico: ', error);
        throw error;
    }
}
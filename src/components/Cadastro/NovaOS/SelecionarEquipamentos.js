import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import styles from './FormularioOS.module.css';

const SelecionarEquipamentos = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { formData } = state || {};
    const [quantidadeEquipamentos, setQuantidadeEquipamentos] = useState(1);
    //const [equipamentos, setEquipamentos] = useState([]);
    const [equipamentosSelecionados, setEquipamentosSelecionados] = useState([]);
    const [opcoesEquipamentos, setOpcoesEquipamentos] = useState([]);

    useEffect(() => {
        const fetchEquipamentos = async () => {
            try {
                // Buscar o departamento associado ao solicitante
                const solicitanteResponse = await api.get(`/solicitantes/${formData.cod_sol}`);
                const departamentoId = solicitanteResponse.data.departamento.id;

                // Buscar os equipamentos do departamento
                const response = await api.get(`/equipamentos/departamento/${departamentoId}`);
                setOpcoesEquipamentos(response.data);
            } catch (error) {
                console.error('Erro ao carregar equipamentos:', error);
            }
        };
        fetchEquipamentos();
    }, [formData.cod_sol]);


    const handleQuantidadeChange = (e) => {
        const qtd = parseInt(e.target.value);
        setQuantidadeEquipamentos(qtd);
        setEquipamentosSelecionados(Array(qtd).fill(''));
    };

    const handleEquipamentoChange = (index, value) => {
        const updatedEquipamentos = [...equipamentosSelecionados];
        updatedEquipamentos[index] = value;
        setEquipamentosSelecionados(updatedEquipamentos);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (equipamentosSelecionados.some(equip => !equip)) {
            console.error('Todos os equipamentos devem ser selecionados.');
            return;
        }

        const osPayload = {
            ...formData,
            equipamentosIds: equipamentosSelecionados
        };

        try {
            await api.post('/osmenu', osPayload);
            navigate('/osmenu');
        } catch (error) {
            console.error('Erro ao criar ordem de serviço:', error);
        }
    };


    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Quantidade de Equipamentos:</label>
                    <input
                        type="number"
                        min="1"
                        max="5" // Defina um máximo conforme necessário
                        value={quantidadeEquipamentos}
                        onChange={handleQuantidadeChange}
                    />
                </div>

                {[...Array(quantidadeEquipamentos)].map((_, index) => (
                    <div key={index} className={styles.formGroup}>
                        <label>Equipamento {index + 1}:</label>
                        <select
                            value={equipamentosSelecionados[index] || ''}
                            onChange={(e) => handleEquipamentoChange(index, e.target.value)}
                        >
                            <option value="">Selecione o equipamento</option>
                            {opcoesEquipamentos.map(equip => (
                                <option key={equip.id} value={equip.id}>{equip.num_patrimonio}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <div className={styles.formButtons}>
                    <Link className={styles.linkBtn} to="/novaos">
                        <button type="button" className={styles.btnBack}>Voltar</button>
                    </Link>
                    <button type="submit" className={styles.btnSubmit}>Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default SelecionarEquipamentos;

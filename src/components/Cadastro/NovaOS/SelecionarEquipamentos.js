import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import styles from './FormularioOS.module.css';

const SelecionarEquipamentos = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { formData } = state || {};
    const [quantidadeEquipamentos, setQuantidadeEquipamentos] = useState(1);
    const [equipamentosSelecionados, setEquipamentosSelecionados] = useState([]);




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
            equipamentoPatrimonio: equipamentosSelecionados.join(", ")
        };

        try {
            await api.post('/osmenu', osPayload);
            navigate('/osmenu');
        } catch (error) {
            console.error('Erro ao criar ordem de serviço:', error);
        }
    };


    return (
        <>
            <Cabecalho />
            <h1 className={styles.pageTitle}>Nova O. S.</h1>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Quantidade de Equipamentos:</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={quantidadeEquipamentos}
                            onChange={handleQuantidadeChange}
                        />
                    </div>

                    {[...Array(quantidadeEquipamentos)].map((_, index) => (
                        <div key={index} className={styles.formGroup}>
                            <label>Equipamento {index + 1}:</label>
                            <input
                                type="number" // Tipo "number" para aceitar apenas números
                                value={equipamentosSelecionados[index] || ''}
                                onChange={(e) => handleEquipamentoChange(index, e.target.value)}
                                placeholder="Digite o número de patrimônio"
                            />
                        </div>
                    ))}

                    <div className={styles.formButtons}>
                        <Link className={styles.linkBtn} to="/novaos" state={{ formData }}>
                            <button type="button" className={styles.btnBack}>Voltar</button>
                        </Link>
                        <button type="submit" className={styles.btnSubmit}>Salvar</button>

                    </div>
                </form>
            </div>
        </>
    );
};

export default SelecionarEquipamentos;

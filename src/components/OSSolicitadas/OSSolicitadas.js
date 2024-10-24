import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrdemServico } from '../../api/ordemServico';
import Cabecalho from '../Cabecalho/Cabecalho';
import styles from './OSSolicitadas.module.css';
import OSSolicitadasItem from './OSSolicitadasItem';

function OSSolicitadas() {
    const [solicitadas, setSolicitadas] = useState([]);

    useEffect(() => {
        const fetchOrdensSolicitadas = async () => {
            try {
                const data = await getAllOrdemServico();  // Ou outra função específica para buscar ordens solicitadas
                const ordensEmAberto = data.filter(item => item.status === 'EM_ABERTO');
                setSolicitadas(ordensEmAberto);
            } catch (error) {
                console.error('Erro ao buscar ordens solicitadas:', error);
            }
        };
        fetchOrdensSolicitadas();
    }, []);

    const handleUpdateOrdem = (id) => {
        setSolicitadas(prevSolicitadas => prevSolicitadas.filter(ordem => ordem.id !== id));
    };

    return (
        <main className={styles.solicitacaoModule}>
            <Cabecalho />
            <div className={styles.contentWrapper}>
                <h2 className={styles.listTitle}>Ordens de serviços solicitadas</h2>
                <section className={styles.listSection}>
                    {solicitadas.length > 0 ? (
                        solicitadas.map((solicitada, index) => (
                            <OSSolicitadasItem key={solicitada.id}
                                dataAbertura={solicitada.data_abertura ? format(new Date(solicitada.data_abertura), "dd/MM/yyyy") : ''}
                                patrimonio={solicitada.equipamentos.map(eq => eq.num_patrimonio).join(', ')}
                                descricao={solicitada.descricao}
                                id={solicitada.id}
                                solicitante={solicitada.solicitante.nome}
                                secretaria={solicitada.solicitante.departamento.secretaria.nome}
                                departamento={solicitada.solicitante.departamento.nome}
                                onUpdate={handleUpdateOrdem}
                                onDelete={handleUpdateOrdem}
                            />
                        ))
                    ) : (
                        <p>Nenhuma ordem solicitada no momento.</p>
                    )}
                </section>
            </div>
            <Link to="/osmenu" className={styles.backButtonLink}>
                <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
            </Link>
        </main>
    )
}

export default OSSolicitadas;
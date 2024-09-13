import styles from './OSSolicitadas.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import OSSolicitadasItem from './OSSolicitadasItem'
import {Link} from 'react-router-dom';

function OSSolicitadas() {
    const solicitadas = [
        {
            numProtocolo: "21009826",
            dataAbertura: "29/03/2022",
            patrimonio: "453525",
            solicitante: "Pedro",
            secretaria: "Saúde",
            departamento: "Saúde",
            descricao: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009826",
            dataAbertura: "29/03/2022",
            patrimonio: "453525",
            solicitante: "Pedro",
            secretaria: "Saúde",
            departamento: "Saúde",
            descricao: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
            imageUrl: "/imagens/ordem.svg"
        },
    ];


    return (
        <main className={styles.solicitacaoModule}>
            <Cabecalho />
            <div className={styles.contentWrapper}>
                <h2 className={styles.listTitle}>Ordens de serviços solicitadas</h2>
                <section className={styles.listSection}>
                    {solicitadas.map((solicitada, index) => (
                        <OSSolicitadasItem key={index} {...solicitada} />
                    ))}
                </section>
            </div>
            <Link to="/osmenu" className={styles.backButtonLink}>
                    <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
            </Link>
        </main>
    )
}

export default OSSolicitadas;
import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import styles from '../../Cadastro/Novo.module.css';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../../Cadastro/Formulario/Formulario';

const GerarRelatorio = () => {
    const { username } = useContext(UserContext);
    let url = '';
    const campos = [
        {label: 'Data Inicio', name: 'DataInicio', type: 'date'},
        {label: 'Data Final', name: 'DataFinal', type: 'date'},
        {label: 'Relatório por', name: 'tipo', type: 'select', options: ['Solicitante', 'Secretaria', 'Departamento', 'Técnico', 'Tipo chamado']}
    ]

    const handleFormSubmit = (formData) => {
        console.log('Dados do formulário:', formData);
    }; 

    if (username === 'Jonas de Godoi') {
        url = '/menu2'
      } else {
        url = '/menu'
      }

    return (
        <div className={styles.container}>
            <Cabecalho />
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Gerar Relátorio</h1>
                <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl={url}/>
            </main>
        </div>
    );
}

export default GerarRelatorio;
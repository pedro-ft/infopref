import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import styles from '../../Cadastro/Novo.module.css';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../../Cadastro/Formulario/Formulario';

const GerarRelatorio = () => {
    const { userProfile } = useContext(UserContext);
    let url = '';
    const campos = [
        {label: 'Data Inicio', name: 'DataInicio', type: 'date'},
        {label: 'Data Final', name: 'DataFinal', type: 'date'},
        {label: 'Relatório por', name: 'tipo', type: 'select', options: [{label: 'Solicitante', value: 'solicitante'}, {label: 'Secretaria', value: 'secretaria'}, {label: 'Departamento', value: 'departamento'}, {label: 'Técnico', value: 'tecnico'}, {label:'Tipo chamado', value: 'tipo-chamado'}]}
    ]

    const handleFormSubmit = (formData) => {
        console.log('Dados do formulário:', formData);
    }; 

    if (userProfile === 'ADM') {
        url = '/menu'
      } else {
        url = '/menu2'
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
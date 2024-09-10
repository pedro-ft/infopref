import React from 'react';
import styles from './NovaOS.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import FormField from './FormField.js';
import FormFieldWithIcon from './FormFieldWithIcon';
import Button from './Button';

const NovaOS = () => {
  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Nova O. S.</h1>
        <form className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.protocolNumber}>
              Nº de Protocolo: 163247382
            </div>
            <div className={styles.openingDate}>
              Data Abertura: 27/05/2024
            </div>
          </div>
          <div className={styles.divider} />
          <FormField label="Nome Solicitante:" />
          <div className={styles.formRow}>
            <FormField label="Secretaria:" />
            <FormField label="Departamento:" />
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGridRow}>
              <div className={styles.formGridColumn}>
                <div className={styles.formFieldGroup}>
                  <FormField label="Tipo Chamado :" />
                  <FormFieldWithIcon label="Status:" iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/a349e3e5a75ec602c102fea0a4a81ff3e61d4d57d095cfc2fa56dec8db814b3f?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8" />
                </div>
              </div>
              <div className={styles.formGridColumn}>
                <div className={styles.formFieldGroup}>
                  <FormField label="Nº Patrimônio :" />
                  <FormFieldWithIcon label="Prioridade:" iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/a349e3e5a75ec602c102fea0a4a81ff3e61d4d57d095cfc2fa56dec8db814b3f?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formRow}>
            <FormField label="Técnico:" />
            <FormField label="Data Finalização*:" />
          </div>
          <div className={styles.buttonGroup}>
            <div className={styles.buttonWrapper}>
              <Button>Avançar</Button>
              <p className={styles.optionalFieldsNote}>
                *: Campos não obrigatórios
              </p>
            </div>
            <Button>Voltar</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NovaOS;
import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import EditForm from '../EditForm/EditForm';
import styles from './SolicitanteCard.module.css';

function SolicitanteCard({ id, nome, departamento, secretariat, fone, id_acesso_remoto, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {

  }, [id, nome, departamento, secretariat, fone, id_acesso_remoto]);


  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await api.get('/departamentos');
        setDepartamentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
      }
    };
    fetchDepartamentos();
  }, []);

  useEffect(() => {
    if (departamentos.length > 0) {
      const departamento = departamentos.find(dep => dep.id === (selectedDepartamento ? selectedDepartamento.id : null));
      setSelectedDepartamento(departamento);
    }
  }, [departamentos, selectedDepartamento]);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setNewPassword('');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const fetchDetails = async (solicitanteId) => {
    try {
      const response = await api.get(`/solicitantes/${solicitanteId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do solicitante:', error);
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const solicitanteDetails = await fetchDetails(id);

      if (solicitanteDetails && solicitanteDetails.user && solicitanteDetails.user.id) {
        const userId = solicitanteDetails.user.id;

        await api.delete(`/solicitantes/${id}`);


        await api.delete(`/user/${userId}`);

      } else {
        setErrorMessage('Não é possível excluir este solicitante, pois está associado a outros registros.');
      }

      if (onDelete) {
        onDelete(id);
      }
      closeModal();
    } catch (error) {
      setErrorMessage('Não é possível excluir este solicitante, pois está associado a outros registros.');
    }
  };

  const handleEditClick = () => {
    const departamentoAtual = departamentos.find(dep => dep.nome === departamento);
    setSelectedDepartamento(departamentoAtual);
    setIsEditing(true);
  };


  const handleEdit = async (updatedData) => {
    if (!updatedData.nome || !updatedData.departamento) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }
    // Remove qualquer formatação para o envio ao backend
    const rawPhone = updatedData.fone.replace(/\D/g, '');


    // Validar o telefone (deve ter 10 ou 11 dígitos)
    if (rawPhone.length < 10 || rawPhone.length > 11) {
      setErrorMessage('O número de telefone deve ter entre 10 e 11 dígitos.');
      return;
    }

    updatedData.fone = rawPhone;

    try {
      const departamento = departamentos.find(dep => dep.id === Number(updatedData.departamento));
      if (!departamento) {
        console.error("Departamento não encontrado com o ID:", Number(updatedData.departamento));
        return;
      }

      const payload = {
        id,
        nome: updatedData.nome,
        fone: updatedData.fone,
        id_acesso_remoto: updatedData.id_acesso_remoto,
        departamento: {
          id: departamento.id,
          nome: departamento.nome,
          secretaria: departamento.secretaria
        }
      };
      await api.put(`/solicitantes/${id}`, payload);

      if (onEdit) {
        onEdit(payload);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar solicitante: ", error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword) {
      try {
        const solicitanteDetails = await fetchDetails(id);

        if (solicitanteDetails && solicitanteDetails.user && solicitanteDetails.user.id) {
          const userId = solicitanteDetails.user.id;
          await api.put(`/user/${userId}/reset-password`, newPassword);
          closePasswordModal();
        } else {
          console.error("Nenhum usuário associado encontrado para o solicitante");
        }
      } catch (error) {
        setErrorMessage('A senha deve ter entre 5 e 20 caracteres, incluindo pelo menos uma letra e um número.');
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMessage('');
  };

  const fields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'fone', label: 'Telefone', type: 'text' },
    { name: 'id_acesso_remoto', label: 'ID de Acesso Remoto', type: 'text' },
    {
      label: 'Departamento', name: 'departamento', type: 'select', options: departamentos
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .map(dep => {
          return { label: dep.nome, value: dep.id };
        })
    },
  ];

  const formatPhoneNumber = (number) => {
    if (!number) return '';
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return number;
  };

  return (
    <>
      <article className={styles.card}>
        <img src="/imagens/Usuario.svg" alt={`${nome}'s avatar`} className={styles.avatar} />
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.name}>Nome: {nome}</h3>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.info}>
              <p>{secretariat}</p>
              <p>{departamento}</p>
              <p>Fone: {formatPhoneNumber(fone)}</p>
              <p>ID de Acesso Remoto: {id_acesso_remoto}</p>
              <button className={styles.changeButton} onClick={openPasswordModal}>
                Redefinir Senha
              </button>
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton} aria-label="Edit" onClick={handleEditClick}>
                <img src="/imagens/Editar.svg" alt="" />
              </button>
              <button className={styles.deleteButton} onClick={openModal} aria-label="Delete">
                <img src="imagens/Excluir.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o solicitante {nome}?</p>
            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.cancelButton}>Não</button>
              <button onClick={handleConfirmDelete} className={styles.confirmButton}>Sim</button>
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Redefinir Senha</h2>
            <div className={styles.inputContainer}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
              />
              <img
                src={isPasswordVisible ? "imagens/iconeOculto.svg" : "imagens/iconeVisualizar.svg"}
                alt={isPasswordVisible ? "Ocultar senha" : "Exibir senha"}
                className={styles.inputIcon}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className={styles.modalActions}>
              <button onClick={closePasswordModal} className={styles.cancelButton}>Cancelar</button>
              <button onClick={handleResetPassword} className={styles.confirmButton}>Confirmar</button>
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          </div>
        </div>
      )}


      {isEditing && (
        <EditForm
          fields={fields}
          initialValues={{ nome, fone: formatPhoneNumber(fone), departamento: selectedDepartamento ? selectedDepartamento.id : '', id_acesso_remoto }}
          onSubmit={handleEdit}
          onCancel={handleCancelEdit}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}

export default SolicitanteCard;
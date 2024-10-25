import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import EditForm from '../EditForm/EditForm';
import styles from './SolicitanteCard.module.css';

function SolicitanteCard({ id, nome, departamento, secretariat, fone, id_acesso_remoto, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Novo estado para o modal de senha
  const [newPassword, setNewPassword] = useState('');

  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);

  useEffect(() => {
    console.log('Dados recebidos no SolicitanteCard:', { id, nome, departamento, secretariat, fone, id_acesso_remoto });
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
    setIsPasswordModalOpen(true); // Abre o modal de senha
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false); // Fecha o modal de senha
    setNewPassword(''); // Limpa a nova senha
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
        console.log("Solicitante removido");

        await api.delete(`/user/${userId}`);
        console.log("Usuário associado removido");
      } else {
        console.error("Nenhum usuário associado encontrado para o solicitante");
      }

      if (onDelete) {
        onDelete(id);
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao deletar solicitante ou usuário associado:", error);
    }
  };

  const handleEditClick = () => {
    const departamentoAtual = departamentos.find(dep => dep.nome === departamento);
    setSelectedDepartamento(departamentoAtual);
    setIsEditing(true);
  };


  const handleEdit = async (updatedData) => {
    try {

      console.log('Dados atualizados recebidos:', updatedData);

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

      console.log('Dados enviados para o servidor:', payload);
      await api.put(`/solicitantes/${id}`, payload);
      console.log('Objeto editado:', payload);

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
        // Buscar detalhes do solicitante para obter o ID do usuário associado
        const solicitanteDetails = await fetchDetails(id);

        if (solicitanteDetails && solicitanteDetails.user && solicitanteDetails.user.id) {
          const userId = solicitanteDetails.user.id;

          // Usar o ID do usuário associado para redefinir a senha
          await api.put(`/user/${userId}/reset-password`, newPassword);
          alert("Senha redefinida com sucesso!");
          closePasswordModal();
        } else {
          console.error("Nenhum usuário associado encontrado para o solicitante");
          alert("Erro ao redefinir a senha. Nenhum usuário associado encontrado.");
        }
      } catch (error) {
        console.error("Erro ao redefinir a senha:", error);
        alert("Erro ao redefinir a senha. Tente novamente.");
      }
    }
  };


  const handleCancelEdit = () => {
    setIsEditing(false);
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
              <p>Fone: {fone}</p>
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
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Redefinir Senha</h2>
            <input
              type="password"
              placeholder="Digite a nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalActions}>
              <button onClick={closePasswordModal} className={styles.cancelButton}>Cancelar</button>
              <button onClick={handleResetPassword} className={styles.confirmButton}>Confirmar</button>
            </div>
          </div>
        </div>
      )}


      {isEditing && (
        <EditForm
          fields={fields}
          initialValues={{ nome, fone, departamento: selectedDepartamento ? selectedDepartamento.id : '', id_acesso_remoto }}
          onSubmit={handleEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}

export default SolicitanteCard;
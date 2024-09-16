import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getAllSolicitantes } from '../../../api/solicitante';
import styles from './SolicitanteList.module.css';
import Cabecalho from '../../Cabecalho/Cabecalho';
import SolicitanteCard from './SolicitanteCard';
import ActionBar from '../../ActionBar/ActionBar';

const initialSolicitantes = [
  {
    name: "Pedro Ferreira Taborda",
    department: "Administração",
    secretariat: "Administração",
    phone: "(42) 99806-7951",
    remoteAccessId: "565 789 786",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Leonardo Mulinari",
    department: "Educação e Cultura",
    secretariat: "Educação e Cultura",
    phone: "(42) 99923-8965",
    remoteAccessId: "321 654 543",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Jonas de Godoi",
    department: "Saúde",
    secretariat: "Saúde",
    phone: "(42) 99134-6751",
    remoteAccessId: "562 955 654",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Maressa Gonçalves Delbone",
    department: "Saúde",
    secretariat: "Saúde",
    phone: "(42) 99807-1234",
    remoteAccessId: "565 789 787",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Maria Clara Santos",
    department: "Educação",
    secretariat: "Educação e Saúde",
    phone: "(42) 99807-1234",
    remoteAccessId: "565 789 787",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "João Pedro Almeida",
    department: "Segurança",
    secretariat: "Segurança Pública",
    phone: "(42) 99808-2345",
    remoteAccessId: "565 789 788",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Ana Beatriz Oliveira",
    department: "Transportes",
    secretariat: "Transportes e Trânsito",
    phone: "(42) 99809-3456",
    remoteAccessId: "565 789 789",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Carlos Eduardo Costa",
    department: "Ambiente",
    secretariat: "Ambiente e Sustentabilidade",
    phone: "(42) 99810-4567",
    remoteAccessId: "565 789 790",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Fernanda Martins",
    department: "Cultura",
    secretariat: "Cultura e Lazer",
    phone: "(42) 99811-5678",
    remoteAccessId: "565 789 791",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Roberto Lima",
    department: "Desenvolvimento",
    secretariat: "Desenvolvimento Econômico",
    phone: "(42) 99812-6789",
    remoteAccessId: "565 789 792",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Juliana Silva",
    department: "Assistência",
    secretariat: "Assistência Social",
    phone: "(42) 99813-7890",
    remoteAccessId: "565 789 793",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Lucas Andrade",
    department: "Administração",
    secretariat: "Administração",
    phone: "(42) 99814-8901",
    remoteAccessId: "565 789 794",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Beatriz Souza",
    department: "Educação",
    secretariat: "Educação e Saúde",
    phone: "(42) 99815-9012",
    remoteAccessId: "565 789 795",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Rafael Martins",
    department: "Segurança",
    secretariat: "Segurança Pública",
    phone: "(42) 99816-0123",
    remoteAccessId: "565 789 796",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Isabela Costa",
    department: "Transportes",
    secretariat: "Transportes e Trânsito",
    phone: "(42) 99817-1234",
    remoteAccessId: "565 789 797",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Thiago Oliveira",
    department: "Ambiente",
    secretariat: "Ambiente e Sustentabilidade",
    phone: "(42) 99818-2345",
    remoteAccessId: "565 789 798",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Laura Ribeiro",
    department: "Cultura",
    secretariat: "Cultura e Lazer",
    phone: "(42) 99819-3456",
    remoteAccessId: "565 789 799",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Marcos Silva",
    department: "Desenvolvimento",
    secretariat: "Desenvolvimento Econômico",
    phone: "(42) 99820-4567",
    remoteAccessId: "565 789 800",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Camila Almeida",
    department: "Assistência",
    secretariat: "Assistência Social",
    phone: "(42) 99821-5678",
    remoteAccessId: "565 789 801",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Gustavo Oliveira",
    department: "Administração",
    secretariat: "Administração",
    phone: "(42) 99822-6789",
    remoteAccessId: "565 789 802",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Juliana Costa",
    department: "Educação",
    secretariat: "Educação e Saúde",
    phone: "(42) 99823-7890",
    remoteAccessId: "565 789 803",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "André Souza",
    department: "Segurança",
    secretariat: "Segurança Pública",
    phone: "(42) 99824-8901",
    remoteAccessId: "565 789 804",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Priscila Lima",
    department: "Transportes",
    secretariat: "Transportes e Trânsito",
    phone: "(42) 99825-9012",
    remoteAccessId: "565 789 805",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Daniela Ribeiro",
    department: "Ambiente",
    secretariat: "Ambiente e Sustentabilidade",
    phone: "(42) 99826-0123",
    remoteAccessId: "565 789 806",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Vinícius Santos",
    department: "Cultura",
    secretariat: "Cultura e Lazer",
    phone: "(42) 99827-1234",
    remoteAccessId: "565 789 807",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Tais Oliveira",
    department: "Desenvolvimento",
    secretariat: "Desenvolvimento Econômico",
    phone: "(42) 99828-2345",
    remoteAccessId: "565 789 808",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Ricardo Ferreira",
    department: "Assistência",
    secretariat: "Assistência Social",
    phone: "(42) 99829-3456",
    remoteAccessId: "565 789 809",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Larissa Santos",
    department: "Administração",
    secretariat: "Administração",
    phone: "(42) 99830-4567",
    remoteAccessId: "565 789 810",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Eduardo Silva",
    department: "Educação",
    secretariat: "Educação e Saúde",
    phone: "(42) 99831-5678",
    remoteAccessId: "565 789 811",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Juliana Almeida",
    department: "Segurança",
    secretariat: "Segurança Pública",
    phone: "(42) 99832-6789",
    remoteAccessId: "565 789 812",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Felipe Costa",
    department: "Transportes",
    secretariat: "Transportes e Trânsito",
    phone: "(42) 99833-7890",
    remoteAccessId: "565 789 813",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Tatiane Oliveira",
    department: "Ambiente",
    secretariat: "Ambiente e Sustentabilidade",
    phone: "(42) 99834-8901",
    remoteAccessId: "565 789 814",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Renato Lima",
    department: "Cultura",
    secretariat: "Cultura e Lazer",
    phone: "(42) 99835-9012",
    remoteAccessId: "565 789 815",
    imageUrl: "/imagens/Usuario.svg"
  }
];

function SolicitanteList() {
  const { userProfile } = useContext(UserContext);
  const [solicitantes, setSolicitantes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  // Função para buscar os solicitantes do back-end
  useEffect(() => {
    const fetchSolicitantes = async () => {
      try {
        const data = await getAllSolicitantes();
        setSolicitantes(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar solicitantes:', error);
        setLoading(false);
      }
    };
    fetchSolicitantes();
  }, []);

  const filteredSolicitantes = solicitantes.filter(solicitante =>
    solicitante.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSolicitantes.length / itemsPerPage); 

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredSolicitantes.slice(startIndex, startIndex + itemsPerPage);
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  const handleBackClick = () => {
    if (userProfile === 'ADM') {
      navigate('/menu');
    } else if (userProfile === 'TECNICO') {
      navigate('/menu2');
    }
  };

  if (loading) {
    return <p>Carregando solicitantes...</p>;
  }

  const handleEditSolicitante = (index, updatedSolicitante) => {
    const updatedSolicitantes = [...solicitantes];
    updatedSolicitantes[index] = updatedSolicitante;
    setSolicitantes(updatedSolicitantes);
  };


  return (
    <main className={styles.solicitanteModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Solicitante' link='novo-solicitante' onSearch={handleSearch} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Solicitantes</h2>
        <section className={styles.listSection}>
        {currentItems.length > 0 ? (
            currentItems.map((solicitante, index) => (
              <SolicitanteCard key={startIndex + index} name={solicitante.nome}
                department={solicitante.departamento.nome}
                secretariat={solicitante.departamento.secretaria.nome}
                phone={solicitante.fone}
                remoteAccessId={solicitante.id_acesso_remoto}
                onEdit={(updatedSolicitante) => handleEditSolicitante(startIndex + index, updatedSolicitante)}
                />
          ))
                ) : (
                  <p>Nenhum solicitante encontrado.</p>
                )}
        </section>
      </div>
      <div className={styles.pagination}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
      <button onClick={handleBackClick} className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </main>
  );
}

export default SolicitanteList;
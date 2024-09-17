import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NovaOS from './components/Cadastro/NovaOS/NovaOS';
import NovaSecretaria from './components/Cadastro/NovaSecretaria/NovaSecretaria';
import NovoTecnico from './components/Cadastro/Novo Técnico/NovoTecnico';
import NovoDepartamento from './components/Cadastro/NovoDepartamento/NovoDepartamento';
import NovoEquipamento from './components/Cadastro/NovoEquipamento/NovoEquipamento';
import NovaInfoInternet from './components/Cadastro/NovoInfoInternet/NovoInfoInternet';
import NovoSolicitante from './components/Cadastro/NovoSolicitante/NovoSolicitante';
import ProtectedRoute from './components/context/ProtectedRoute';
import { UserProvider } from './components/context/UserContext';
import LoginPage from './components/LoginPage/LoginPage';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal';
import MenuPrincipalSemADM from './components/MenuPrincipalSemADM/MenuPrincipalSemADM';
import DepartamentoList from './components/Menus/MenuDepartamento/DepartamentoList';
import EquipamentoList from './components/Menus/MenuEquipamentos/EquipamentoList';
import InfoInternetList from './components/Menus/MenuInfoInternet/InfoInternetList';
import OrderServicePage from './components/Menus/MenuOS/OrderServicePage';
import SecretariaList from './components/Menus/MenuSecretaria/SecretariaList';
import SolicitanteList from './components/Menus/MenuSolicitante/SolicitanteList';
import TecnicosList from './components/Menus/MenuTecnico/TecnicoList';
import GerarRelatorio from './components/Menus/Relatorios/GerarRelatorio';
import OSSolicitadas from './components/OSSolicitadas/OSSolicitadas';
import MinhasSolicitacoes from './components/TelasSolicitante/MinhasSolicitacoes';
import SolicitarOS from './components/TelasSolicitante/SolicitarOrdem';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/minhas-solicitacoes" element={<ProtectedRoute element={<MinhasSolicitacoes />} />} />
            <Route path="/solicitar-ordem" element={<ProtectedRoute element={<SolicitarOS />} />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/menu" element={<ProtectedRoute element={<MenuPrincipal />} />} />
            <Route path="/menu2" element={<ProtectedRoute element={<MenuPrincipalSemADM />} />} />
            <Route path="/osmenu" element={<ProtectedRoute element={<OrderServicePage />} />} />
            <Route path="/novaos" element={<ProtectedRoute element={<NovaOS />} />} />
            <Route path="/osSolicitadas" element={<ProtectedRoute element={<OSSolicitadas />} />} />
            <Route path="/solicitantes" element={<ProtectedRoute element={<SolicitanteList />} />} />
            <Route path="/novo-solicitante" element={<ProtectedRoute element={<NovoSolicitante />} />} />
            <Route path="/tecnicos" element={<ProtectedRoute element={<TecnicosList />} />} />
            <Route path="/novo-tecnico" element={<ProtectedRoute element={<NovoTecnico />} />} />
            <Route path="/secretarias" element={<ProtectedRoute element={<SecretariaList />} />} />
            <Route path="/nova-secretaria" element={<ProtectedRoute element={<NovaSecretaria />} />} />
            <Route path="/departamentos" element={<ProtectedRoute element={<DepartamentoList />} />} />
            <Route path="/novo-departamento" element={<ProtectedRoute element={<NovoDepartamento />} />} />
            <Route path="/departamentos/:id/equipamentos" element={<EquipamentoList />} />
            <Route path="/novo-equipamento/:id" element={<ProtectedRoute element={<NovoEquipamento />} />} />
            <Route path="/infoInternet" element={<ProtectedRoute element={<InfoInternetList />} />} />
            <Route path="/novo-info-internet" element={<ProtectedRoute element={<NovaInfoInternet />} />} />
            <Route path="/relatorios" element={<ProtectedRoute element={<GerarRelatorio />} />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

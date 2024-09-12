import LoginPage from './components/LoginPage/LoginPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal';
import OrderServicePage from './components/MenuOS/OrderServicePage';
import SolicitanteList from './components/MenuSolicitante/SolicitanteList';
import TecnicosList from './components/MenuTecnico/TecnicoList'
import NovaOS from './components/NovaOS/NovaOS';
import SecretariaList from './components/MenuSecretaria/SecretariaList';
import DepartamentoList from './components/MenuDepartamento/DepartamentoList'
import EquipamentoList from './components/MenuEquipamentos/EquipamentosList';
import InfoInternetList from './components/MenuInfoInternet/InfoInternetList';
import ProtectedRoute from './components/context/ProtectedRoute';
import NovoSolicitante from './components/NovoSolicitante/NovoSolicitante';
import NovaSecretaria from './components/NovaSecretaria/NovaSecretaria';
import NovoDepartamento from './components/NovoDepartamento/NovoDepartamento';
import NovoEquipamento from './components/NovoEquipamento/NovoEquipamento';
import NovaInfoInternet from './components/NovoInfoInternet/NovoInfoInternet';
import NovoTecnico from './components/Novo Técnico/NovoTecnico';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/menu" element={<ProtectedRoute element={<MenuPrincipal />}/>} />
            <Route path="/osmenu" element={<ProtectedRoute element={<OrderServicePage />}/>} />
            <Route path="/novaos" element={<ProtectedRoute element={<NovaOS />} />} />
            <Route path="/solicitantes" element={<ProtectedRoute element={<SolicitanteList />} />}/>
            <Route path="/novo-solicitante" element={<ProtectedRoute element={<NovoSolicitante />} />}/>
            <Route path="/tecnicos" element={<ProtectedRoute element={<TecnicosList />} />}/>
            <Route path="/novo-tecnico" element={<ProtectedRoute element={<NovoTecnico />} />}/>
            <Route path="/secretarias" element={<ProtectedRoute element={<SecretariaList />} />}/>
            <Route path="/nova-secretaria" element={<ProtectedRoute element={<NovaSecretaria />} />}/>
            <Route path="/departamentos" element={<ProtectedRoute element={<DepartamentoList />} />}/>
            <Route path="/novo-departamento" element={<ProtectedRoute element={<NovoDepartamento />} />}/>
            <Route path="/equipamentos" element={<ProtectedRoute element={<EquipamentoList />} />}/>
            <Route path="/novo-equipamento" element={<ProtectedRoute element={<NovoEquipamento />} />}/>
            <Route path="/infoInternet" element={<ProtectedRoute element={<InfoInternetList />} />}/>
            <Route path="/novo-info-internet" element={<ProtectedRoute element={<NovaInfoInternet />} />}/>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

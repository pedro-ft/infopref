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
            <Route path="/tecnicos" element={<ProtectedRoute element={<TecnicosList />} />}/>
            <Route path="/secretarias" element={<ProtectedRoute element={<SecretariaList />} />}/>
            <Route path="/departamentos" element={<ProtectedRoute element={<DepartamentoList />} />}/>
            <Route path="/equipamentos" element={<ProtectedRoute element={<EquipamentoList />} />}/>
            <Route path="/infoInternet" element={<ProtectedRoute element={<InfoInternetList />} />}/>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

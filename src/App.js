import LoginPage from './components/LoginPage/LoginPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal';
import OrderServicePage from './components/MenuOS/OrderServicePage';
import SolicitanteList from './components/MenuSolicitante/SolicitanteList';
import TecnicosList from './components/MenuTecnico/TecnicoList'
import NovaOS from './components/NovaOS/NovaOS';
import SecretariaList from './components/MenuSecretaria/SecretariaList';
import DepartamentoList from './components/MenuDepartamento/DepartamentoList'
import EquipamentoList from './components/MenuEquipamentos/EquipamentosList';
import InfoInternetList from './components/MenuInfoInternet/InfoInternetList'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPrincipal />} />
          <Route path="/osmenu" element={<OrderServicePage />} />
          <Route path="/novaos" element={<NovaOS />} />
          <Route path="/solicitantes" element={<SolicitanteList />} />
          <Route path="/tecnicos" element={<TecnicosList />} />
          <Route path="/secretarias" element={<SecretariaList />} />
          <Route path="/departamentos" element={<DepartamentoList />} />
          <Route path="/equipamentos" element={<EquipamentoList />} />
          <Route path="/infoInternet" element={<InfoInternetList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

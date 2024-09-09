import LoginPage from './components/LoginPage/LoginPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal';
import OrderServicePage from './components/MenuOS/OrderServicePage';
import SolicitanteList from './components/MenuSolicitante/SolicitanteList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPrincipal />} />
          <Route path="/osmenu" element={<OrderServicePage />} />
          <Route path="/solicitantes" element={<SolicitanteList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

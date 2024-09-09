import LoginPage from './components/LoginPage/LoginPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPrincipal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Importar estilos si los tienes en App.css
import Navbar from './Navbar'; // Importa el componente Navbar que creaste
import AdministradorPage from './Pages/administradorPage'; // Asumiendo que el archivo está en una carpeta 'Pages'
import CeldasEstacionamientoPage from './Pages/celdasEstacionamientoPage'; // Asumiendo que tienes este archivo
import EntradasSalidasPage from './Pages/entradas_SalidasPage';
import PagosPage from './Pages/pagospages';
import UsuariosPage from './Pages/usuariosPage';
import VehiculosPage from './Pages/vehiculosPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar /> {/* Integra el componente Navbar */}
        </header>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta para la ubicación raíz */}
          <Route path="/administrador" element={<AdministradorPage />} />
          <Route path="/celdas-estacionamiento" element={<CeldasEstacionamientoPage />} />
          <Route path="/entradas-salidas" element={<EntradasSalidasPage />} />
          <Route path="/pagos" element={<PagosPage/>} />
          <Route path="/usuarios" element={<UsuariosPage/>} />
          <Route path="/vehiculos" element={<VehiculosPage/>} />

        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Contenido de la página de inicio */}
    </div>
  );
}

export default App;

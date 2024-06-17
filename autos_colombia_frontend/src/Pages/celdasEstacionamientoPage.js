import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/celdasEstacionamientoPage.css'; // Importar estilos CSS

const CeldasEstacionamientoPage = () => {
  const [celdasDisponibles, setCeldasDisponibles] = useState([]);
  const [celdasNoDisponibles, setCeldasNoDisponibles] = useState([]);
  const [placa, setPlaca] = useState('');
  const [idAdministrador, setIdAdministrador] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');

  const obtenerCeldasDisponibles = async () => {
    try {
      const response = await axios.get('/celdas-estacionamiento/disponibles');
      setCeldasDisponibles(response.data.celdas);
    } catch (error) {
      console.error('Error al obtener celdas disponibles:', error);
    }
  };

  const obtenerCeldasNoDisponibles = async () => {
    try {
      const response = await axios.get('/celdas-estacionamiento/no-disponibles');
      setCeldasNoDisponibles(response.data.celdas);
    } catch (error) {
      console.error('Error al obtener celdas no disponibles:', error);
    }
  };

  const asignarCeldaEstacionamiento = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/celdas-estacionamiento/asignar', { placa });
      alert(response.data.message || 'Celda asignada exitosamente');
      setPlaca('');
      obtenerCeldasDisponibles();
      obtenerCeldasNoDisponibles();
    } catch (error) {
      console.error('Error al asignar celda de estacionamiento:', error);
      alert('Error al asignar celda de estacionamiento. Por favor, verifica la placa ingresada.');
    }
  };

  const agregarCeldaEstacionamiento = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/celdas-estacionamiento/agregar-celda', { idAdministrador, estado, tipoServicio });
      alert(response.data.message || 'Celda agregada exitosamente');
      setIdAdministrador('');
      setEstado('');
      setTipoServicio('');
      obtenerCeldasDisponibles();
      obtenerCeldasNoDisponibles();
    } catch (error) {
      console.error('Error al agregar celda de estacionamiento:', error);
      alert('Error al agregar celda de estacionamiento. Por favor, verifica los datos ingresados.');
    }
  };

  useEffect(() => {
    obtenerCeldasDisponibles();
    obtenerCeldasNoDisponibles();
  }, []);

  return (
    <div className="container">
      <h1>Gestión de Celdas de Estacionamiento</h1>

      <div className="form-container">
        <form onSubmit={asignarCeldaEstacionamiento}>
          <h2>Asignar Celda de Estacionamiento</h2>
          <input
            type="text"
            placeholder="Placa del vehículo"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
          <button type="submit">Asignar Celda</button>
        </form>

        <form onSubmit={agregarCeldaEstacionamiento}>
          <h2>Agregar Celda de Estacionamiento</h2>
          <input
            type="text"
            placeholder="ID Administrador"
            value={idAdministrador}
            onChange={(e) => setIdAdministrador(e.target.value)}
          />
          <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo de Servicio"
            value={tipoServicio}
            onChange={(e) => setTipoServicio(e.target.value)}
          />
          <button type="submit">Agregar Celda</button>
        </form>
      </div>

      <div className="lists-container">
        <div className="list">
          <h2>Celdas Disponibles</h2>
          <div className="celdas-grid">
            {celdasDisponibles.map((celda) => (
              <div key={celda.id_celda} className={`celda ${celda.disponible ? 'disponible' : ''}`}>
                {celda.numero_celda}
              </div>
            ))}
          </div>
        </div>

        <div className="list">
          <h2>Celdas No Disponibles</h2>
          <div className="celdas-grid">
            {celdasNoDisponibles.map((celda) => (
              <div key={celda.id_celda} className={`celda ${!celda.disponible ? 'no-disponible' : ''}`}>
                {celda.numero_celda} - {celda.placa} - {celda.marca} - {celda.modelo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeldasEstacionamientoPage;

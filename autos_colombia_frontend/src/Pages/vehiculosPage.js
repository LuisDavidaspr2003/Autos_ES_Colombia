import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/vehiculosPage.css'; // Importar estilos CSS

const VehiculosPage = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  const obtenerVehiculos = async () => {
    try {
      const response = await axios.get('/vehiculos');
      setVehiculos(response.data.vehiculos);
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
      setMensaje('Error al obtener los vehículos');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Lista de Vehículos</h1>

      {mensaje && <p className="message">{mensaje}</p>}

      <div className="vehiculos-list">
        {vehiculos.map((vehiculo) => (
          <div key={vehiculo.id_vehiculo} className="vehiculo-item">
            <div className="vehiculo-details">
              <p><strong>ID Vehículo:</strong> {vehiculo.id_vehiculo}</p>
              <p><strong>Placa:</strong> {vehiculo.placa}</p>
              <p><strong>Marca:</strong> {vehiculo.marca}</p>
              <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
              <p><strong>Hora de Entrada:</strong> {vehiculo.hora_entrada}</p>
              <p><strong>Hora de Salida:</strong> {vehiculo.hora_salida}</p>
              <p><strong>Tipo de Servicio:</strong> {vehiculo.tipo_servicio}</p>
              <p><strong>Estado:</strong> {vehiculo.estado}</p>
              <p><strong>ID Usuario:</strong> {vehiculo.id_usuario}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiculosPage;

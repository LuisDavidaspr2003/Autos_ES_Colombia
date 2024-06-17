import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/entradas_SalidasPage.css'; // Importar estilos CSS

const EntradasSalidasPage = () => {
  const [placaEntrada, setPlacaEntrada] = useState('');
  const [marcaEntrada, setMarcaEntrada] = useState('');
  const [modeloEntrada, setModeloEntrada] = useState('');
  const [tipoServicioEntrada, setTipoServicioEntrada] = useState('');
  const [idUsuarioEntrada, setIdUsuarioEntrada] = useState('');

  const [placaSalida, setPlacaSalida] = useState('');

  const registrarEntrada = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/entradas-salidas/entradas', {
        placa: placaEntrada,
        marca: marcaEntrada,
        modelo: modeloEntrada,
        tipoServicio: tipoServicioEntrada,
        idUsuario: idUsuarioEntrada
      });
      alert(response.data.message);
      limpiarCamposEntrada();
    } catch (error) {
      console.error('Error al registrar la entrada del vehículo:', error);
      alert('Error al registrar la entrada del vehículo');
    }
  };

  const registrarSalida = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/entradas-salidas/salidas/${placaSalida}`);
      alert(response.data.message);
      limpiarCamposSalida();
    } catch (error) {
      console.error('Error al registrar la salida del vehículo:', error);
      alert('Error al registrar la salida del vehículo');
    }
  };

  const limpiarCamposEntrada = () => {
    setPlacaEntrada('');
    setMarcaEntrada('');
    setModeloEntrada('');
    setTipoServicioEntrada('');
    setIdUsuarioEntrada('');
  };

  const limpiarCamposSalida = () => {
    setPlacaSalida('');
  };

  return (
    <div className="container">
      <h1>Gestión de Entradas y Salidas de Vehículos</h1>

      <div className="form-container">
        <form onSubmit={registrarEntrada}>
          <h2>Registrar Entrada de Vehículo</h2>
          <input
            type="text"
            placeholder="Placa del vehículo"
            value={placaEntrada}
            onChange={(e) => setPlacaEntrada(e.target.value)}
          />
          <input
            type="text"
            placeholder="Marca del vehículo"
            value={marcaEntrada}
            onChange={(e) => setMarcaEntrada(e.target.value)}
          />
          <input
            type="text"
            placeholder="Modelo del vehículo"
            value={modeloEntrada}
            onChange={(e) => setModeloEntrada(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo de Servicio"
            value={tipoServicioEntrada}
            onChange={(e) => setTipoServicioEntrada(e.target.value)}
          />
          <input
            type="text"
            placeholder="ID del Usuario"
            value={idUsuarioEntrada}
            onChange={(e) => setIdUsuarioEntrada(e.target.value)}
          />
          <button type="submit">Registrar Entrada</button>
        </form>

        <form onSubmit={registrarSalida}>
          <h2>Registrar Salida de Vehículo</h2>
          <input
            type="text"
            placeholder="Placa del vehículo"
            value={placaSalida}
            onChange={(e) => setPlacaSalida(e.target.value)}
          />
          <button type="submit">Registrar Salida</button>
        </form>
      </div>
    </div>
  );
};

export default EntradasSalidasPage;

import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/usuariosPage.css'; // Importar estilos CSS

const UsuariosPage = () => {
  const [placa, setPlaca] = useState('');
  const [marcaModelo, setMarcaModelo] = useState({ marca: '', modelo: '' });
  const [tipoServicio, setTipoServicio] = useState('');

  const handleRegistroEntrada = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/usuarios/entrada', { placa, marcaModelo, tipoServicio });
      alert(response.data.message);
      setPlaca('');
      setMarcaModelo({ marca: '', modelo: '' });
      setTipoServicio('');
    } catch (error) {
      console.error('Error al registrar la entrada del vehículo:', error);
      alert('Error al registrar la entrada del vehículo');
    }
  };

  const handleRegistroSalida = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/usuarios/salida', { placa });
      alert(response.data.message);
      setPlaca('');
    } catch (error) {
      console.error('Error al registrar la salida del vehículo:', error);
      alert('Error al registrar la salida del vehículo');
    }
  };

  const handleGestionPago = async (e) => {
    e.preventDefault();
    try {
      const totalAPagar = prompt('Ingrese el monto a pagar:');
      if (totalAPagar === null) return; // Si el usuario cancela el ingreso del monto

      const response = await axios.post('/usuarios/pago', { placa, totalAPagar });
      alert(response.data.message);
      setPlaca('');
    } catch (error) {
      console.error('Error al gestionar el pago:', error);
      alert('Error al gestionar el pago');
    }
  };

  return (
    <div className="usuarios-container">
      <h1>Administración de Usuarios</h1>

      <form className="formulario-entrada" onSubmit={handleRegistroEntrada}>
        <h2>Registrar Entrada de Vehículo</h2>
        <input
          type="text"
          placeholder="Placa del vehículo"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />
        <input
          type="text"
          placeholder="Marca del vehículo"
          value={marcaModelo.marca}
          onChange={(e) => setMarcaModelo({ ...marcaModelo, marca: e.target.value })}
        />
        <input
          type="text"
          placeholder="Modelo del vehículo"
          value={marcaModelo.modelo}
          onChange={(e) => setMarcaModelo({ ...marcaModelo, modelo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo de servicio"
          value={tipoServicio}
          onChange={(e) => setTipoServicio(e.target.value)}
        />
        <button type="submit">Registrar Entrada</button>
      </form>

      <form className="formulario-salida" onSubmit={handleRegistroSalida}>
        <h2>Registrar Salida de Vehículo</h2>
        <input
          type="text"
          placeholder="Placa del vehículo"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />
        <button type="submit">Registrar Salida</button>
      </form>

      <form className="formulario-pago" onSubmit={handleGestionPago}>
        <h2>Gestionar Pago</h2>
        <input
          type="text"
          placeholder="Placa del vehículo"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />
        <button type="submit">Gestionar Pago</button>
      </form>
    </div>
  );
};

export default UsuariosPage;

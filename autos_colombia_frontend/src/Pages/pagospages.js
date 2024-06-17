import React, { useState} from 'react';
import axios from 'axios';
import '../Styles/pagosPage.css'; // Importar estilos CSS

const PagosPage = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [idVehiculo, setIdVehiculo] = useState('');
  const [montoPagado, setMontoPagado] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [mensaje, setMensaje] = useState('');

  const procesarPago = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/pagos', {
        id_usuario: idUsuario,
        id_vehiculo: idVehiculo,
        monto_pagado: montoPagado,
        metodo_pago: metodoPago
      });
      setMensaje(response.data.message);
      limpiarFormulario();
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setMensaje('Error al procesar el pago');
    }
  };

  const limpiarFormulario = () => {
    setIdUsuario('');
    setIdVehiculo('');
    setMontoPagado('');
    setMetodoPago('');
  };

  return (
    <div className="container">
      <h1>Gestión de Pagos</h1>

      <form onSubmit={procesarPago}>
        <label>ID Usuario:</label>
        <input
          type="text"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
          required
        />

        <label>ID Vehículo:</label>
        <input
          type="text"
          value={idVehiculo}
          onChange={(e) => setIdVehiculo(e.target.value)}
          required
        />

        <label>Monto Pagado:</label>
        <input
          type="text"
          value={montoPagado}
          onChange={(e) => setMontoPagado(e.target.value)}
          required
        />

        <label>Método de Pago:</label>
        <input
          type="text"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          required
        />

        <button type="submit">Procesar Pago</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default PagosPage;

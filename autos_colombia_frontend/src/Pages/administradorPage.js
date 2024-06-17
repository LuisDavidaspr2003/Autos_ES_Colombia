import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AdministradorPage.css';

const AdministradorPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [telefonoUsuario, setTelefonoUsuario] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  const [administradores, setAdministradores] = useState([]);
  const [nombreAdministrador, setNombreAdministrador] = useState('');
  const [correoAdministrador, setCorreoAdministrador] = useState('');
  const [telefonoAdministrador, setTelefonoAdministrador] = useState('');

  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [mostrarAdministradores, setMostrarAdministradores] = useState(false);

  // Obtener lista de usuarios desde el servidor
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('/administrador/usuarios');
      const data = response.data;
      if (data.success) {
        setUsuarios(data.usuarios);
      } else {
        console.error('Error al obtener usuarios:', data.message);
        setUsuarios([]);
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setUsuarios([]);
    }
  };

  // Agregar un nuevo usuario al sistema
  const agregarUsuario = async (e) => {
    e.preventDefault();

    if (!nombreUsuario || !correoUsuario || !telefonoUsuario || !tipoUsuario) {
      alert('Por favor completa todos los campos para agregar usuario');
      return;
    }

    try {
      await axios.post('/administrador/usuarios/agregar', {
        nombre: nombreUsuario,
        correo: correoUsuario,
        telefono: telefonoUsuario,
        tipo: tipoUsuario
      });
      alert('Usuario agregado exitosamente');
      limpiarCamposUsuario();
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      alert('Error al agregar usuario');
    }
  };

  // Limpiar campos del formulario de usuario
  const limpiarCamposUsuario = () => {
    setNombreUsuario('');
    setCorreoUsuario('');
    setTelefonoUsuario('');
    setTipoUsuario('');
  };

  // Agregar un nuevo administrador al sistema
  const agregarAdministrador = async (e) => {
    e.preventDefault();

    if (!nombreAdministrador || !correoAdministrador || !telefonoAdministrador) {
      alert('Por favor completa todos los campos para agregar administrador');
      return;
    }

    try {
      await axios.post('/administrador/administradores/agregar', {
        nombre: nombreAdministrador,
        correo: correoAdministrador,
        telefono: telefonoAdministrador
      });
      alert('Administrador agregado exitosamente');
      limpiarCamposAdministrador();
      obtenerAdministradores();
    } catch (error) {
      console.error('Error al agregar administrador:', error);
      alert('Error al agregar administrador');
    }
  };

  // Limpiar campos del formulario de administrador
  const limpiarCamposAdministrador = () => {
    setNombreAdministrador('');
    setCorreoAdministrador('');
    setTelefonoAdministrador('');
  };

  // Toggle para mostrar/ocultar lista de usuarios o administradores
  const toggleMostrarLista = async (tipo) => {
    if (tipo === 'usuarios') {
      setMostrarUsuarios(!mostrarUsuarios);
      if (!mostrarUsuarios && usuarios.length === 0) {
        await obtenerUsuarios();
      }
    } else if (tipo === 'administradores') {
      setMostrarAdministradores(!mostrarAdministradores);
      if (!mostrarAdministradores && administradores.length === 0) {
        await obtenerAdministradores();
      }
    }
  };

  // Obtener lista de administradores desde el servidor
  const obtenerAdministradores = async () => {
    try {
      const response = await axios.get('/administrador/administradores');
      const data = response.data;
      if (data.success) {
        setAdministradores(data.administradores);
      } else {
        console.error('Error al obtener administradores:', data.message);
        setAdministradores([]);
      }
    } catch (error) {
      console.error('Error al obtener administradores:', error);
      setAdministradores([]);
    }
  };

  // Efecto para cargar la lista de usuarios al cargar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Efecto para cargar la lista de administradores al montar o actualizar el componente
  useEffect(() => {
    obtenerAdministradores();
  }, []);

  return (
    <div className="administrador-container">
      <h1>Administrador Page</h1>

      <form className="form-container" onSubmit={agregarUsuario}>
        <h2>Agregar Usuario</h2>
        <input type="text" placeholder="Nombre" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
        <input type="email" placeholder="Correo" value={correoUsuario} onChange={(e) => setCorreoUsuario(e.target.value)} />
        <input type="tel" placeholder="Teléfono" value={telefonoUsuario} onChange={(e) => setTelefonoUsuario(e.target.value)} />
        <input type="text" placeholder="Tipo" value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} />
        <button type="submit">Agregar Usuario</button>
      </form>

      <form className="form-container" onSubmit={agregarAdministrador}>
        <h2>Agregar Administrador</h2>
        <input type="text" placeholder="Nombre" value={nombreAdministrador} onChange={(e) => setNombreAdministrador(e.target.value)} />
        <input type="email" placeholder="Correo" value={correoAdministrador} onChange={(e) => setCorreoAdministrador(e.target.value)} />
        <input type="tel" placeholder="Teléfono" value={telefonoAdministrador} onChange={(e) => setTelefonoAdministrador(e.target.value)} />
        <button type="submit">Agregar Administrador</button>
      </form>

      <h2>
        <button className="toggle-button" onClick={() => toggleMostrarLista('usuarios')}>
          {mostrarUsuarios ? 'Ocultar Lista de Usuarios' : 'Listar Usuarios'}
        </button>
      </h2>

      {mostrarUsuarios && (
        <div>
          <h2>Usuarios</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id_usuario}>
                  <td>{usuario.id_usuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.tipo_usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>
        <button className="toggle-button" onClick={() => toggleMostrarLista('administradores')}>
          {mostrarAdministradores ? 'Ocultar Lista de Administradores' : 'Listar Administradores'}
        </button>
      </h2>

      {mostrarAdministradores && (
        <div>
          <h2>Administradores</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
            {administradores.map((administrador) => (
  <tr key={administrador.id}>
    <td>{administrador.id}</td>
    <td>{administrador.nombre}</td>
    <td>{administrador.correo}</td>
    <td>{administrador.telefono}</td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdministradorPage;

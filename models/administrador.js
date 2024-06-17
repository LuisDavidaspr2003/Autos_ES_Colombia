const db = require('../databases/db');

// Función para agregar un nuevo usuario al sistema
async function agregarUsuario(nombre, correo, telefono, tipo) {
    try {
        const query = 'INSERT INTO Usuarios (Nombre, Correo, Telefono, Tipo_Usuario) VALUES ($1, $2, $3, $4)';
        const values = [nombre, correo, telefono, tipo];
        await db.query(query, values);
        return { success: true, message: 'Usuario agregado correctamente' };
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        return { success: false, message: 'Error al agregar usuario' };
    }
}

// Función para listar todos los usuarios del sistema
async function listarUsuarios() {
    try {
        const query = 'SELECT id_usuario, nombre, correo, telefono, tipo_usuario FROM Usuarios';
        const result = await db.query(query);
        return { success: true, usuarios: result.rows };
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        return { success: false, message: 'Error al listar usuarios' };
    }
}

// Función para eliminar un usuario del sistema
async function eliminarUsuario(idUsuario) {
    try {
        const query = 'DELETE FROM Usuarios WHERE id_usuario = $1';
        const result = await db.query(query, [idUsuario]);
        
        if (result.rowCount === 1) {
            return { success: true, message: 'Usuario eliminado correctamente' };
        } else {
            return { success: false, message: 'Usuario no encontrado' };
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return { success: false, message: 'Error al eliminar usuario' };
    }
}

// Función para agregar un nuevo administrador al sistema
async function agregarAdministrador(nombre, correo, telefono) {
    try {
        const query = 'INSERT INTO Administradores (Nombre, Correo, Telefono) VALUES ($1, $2, $3)';
        const values = [nombre, correo, telefono];
        await db.query(query, values);
        return { success: true, message: 'Administrador agregado correctamente' };
    } catch (error) {
        console.error('Error al agregar administrador:', error);
        return { success: false, message: 'Error al agregar administrador' };
    }
}

// Función para listar todos los administradores del sistema
async function listarAdministradores() {
    try {
        const query = 'SELECT id_administrador, nombre, correo, telefono FROM Administradores';
        const result = await db.query(query);
        return { success: true, administradores: result.rows };
    } catch (error) {
        console.error('Error al listar administradores:', error);
        return { success: false, message: 'Error al listar administradores' };
    }
}

module.exports = {
    agregarUsuario,
    listarUsuarios,
    eliminarUsuario,
    agregarAdministrador,
    listarAdministradores,
};

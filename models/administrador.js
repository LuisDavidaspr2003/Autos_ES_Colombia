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
        const query = 'SELECT * FROM Usuarios';
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
        const query = 'DELETE FROM Usuarios WHERE ID_Usuario = $1';
        const values = [idUsuario];
        await db.query(query, values);
        return { success: true, message: 'Usuario eliminado correctamente' };
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

// Función para agregar un nuevo vehículo al sistema
async function agregarVehiculo(placa, marca, modelo) {
    try {
        const query = 'INSERT INTO Vehiculos (Placa, Marca, Modelo) VALUES ($1, $2, $3)';
        const values = [placa, marca, modelo];
        await db.query(query, values);
        return { success: true, message: 'Vehículo agregado correctamente' };
    } catch (error) {
        console.error('Error al agregar vehículo:', error);
        return { success: false, message: 'Error al agregar vehículo' };
    }
}


module.exports = {
    agregarUsuario,
    listarUsuarios,
    eliminarUsuario,
    agregarAdministrador,
    agregarVehiculo,
};

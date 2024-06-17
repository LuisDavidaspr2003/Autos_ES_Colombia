const db = require('../databases/db'); // Importar la conexión a la base de datos

// Función para agregar un nuevo vehículo
async function agregarVehiculo(placa, marca, modelo, horaEntrada, tipoServicio, estado, idUsuario) {
    try {
        // Verificar si todos los datos necesarios se han proporcionado
        if (!placa || !marca || !modelo || !horaEntrada || !tipoServicio || !estado || !idUsuario) {
            return { success: false, message: 'Todos los datos son obligatorios para crear un vehículo.' };
        }

        // Verificar si el usuario existe
        const usuarioQuery = 'SELECT * FROM Usuarios WHERE ID_Usuario = $1';
        const usuarioResult = await db.query(usuarioQuery, [idUsuario]);

        // Si el usuario no existe, retornar un mensaje de error
        if (usuarioResult.rows.length === 0) {
            return { success: false, message: 'Usuario no registrado.' };
        }

        // Insertar un nuevo vehículo en la tabla Vehiculos
        const query = 'INSERT INTO Vehiculos (Placa, Marca, Modelo, Hora_Entrada, Tipo_Servicio, Estado, ID_Usuario) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [placa, marca, modelo, horaEntrada, tipoServicio, estado, idUsuario];
        await db.query(query, values);
        return { success: true, message: 'Vehículo agregado correctamente.' };
    } catch (error) {
        console.error('Error al agregar el vehículo:', error);
        return { success: false, message: 'Error al agregar el vehículo.' };
    }
}

// Función para eliminar un vehículo por su placa
async function eliminarVehiculo(placaVehiculo) {
    try {
        // Eliminar el vehículo de la tabla Vehiculos
        const query = 'DELETE FROM Vehiculos WHERE Placa = $1';
        const values = [placaVehiculo];
        await db.query(query, values);
        return { success: true, message: 'Vehículo eliminado correctamente.' };
    } catch (error) {
        console.error('Error al eliminar el vehículo:', error);
        return { success: false, message: 'Error al eliminar el vehículo.' };
    }
}

// Función para obtener todos los vehículos
async function obtenerVehiculos() {
    try {
        // Consultar todos los vehículos de la tabla Vehiculos
        const query = 'SELECT id_vehiculo, placa, marca, modelo, hora_entrada, tipo_servicio, estado, id_usuario FROM Vehiculos';
        const result = await db.query(query);
        return { success: true, vehiculos: result.rows };
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        return { success: false, message: 'Error al obtener los vehículos.' };
    }
}
// Exportar las funciones para que estén disponibles para otros módulos
module.exports = {
    agregarVehiculo,
    eliminarVehiculo,
    obtenerVehiculos
};

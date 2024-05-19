const db = require('../databases/db'); // Importar la conexión a la base de datos

// Función para registrar la entrada de un vehículo al parqueadero
async function registrarEntrada(placa, marca, modelo, tipoServicio, idUsuario) {
    try {
        // Verificar si el usuario existe
        const usuario = await db.query('SELECT * FROM Usuarios WHERE ID_Usuario = $1', [idUsuario]);
        if (usuario.rows.length === 0) {
            return { success: false, message: 'Usuario no registrado.' };
        }

        // Registrar la entrada en la tabla de Vehiculos
        const query = 'INSERT INTO Vehiculos (Placa, Marca, Modelo, Hora_Entrada, Tipo_Servicio, Estado, ID_Usuario) VALUES ($1, $2, $3, NOW(), $4, $5, $6)';
        const values = [placa, marca, modelo, tipoServicio, 'Activo', idUsuario];
        await db.query(query, values);

        return { success: true, message: 'Entrada registrada correctamente.' };
    } catch (error) {
        console.error('Error al registrar la entrada del vehículo:', error);
        return { success: false, message: 'Error al registrar la entrada del vehículo.' };
    }
}

// Función para registrar la salida de un vehículo del parqueadero
async function registrarSalida(placa) {
    try {
        // Verificar si el vehículo está en la base de datos
        const vehiculoQuery = 'SELECT * FROM Vehiculos WHERE Placa = $1';
        const vehiculoResult = await db.query(vehiculoQuery, [placa]);

        if (vehiculoResult.rows.length === 0) {
            return { success: false, message: 'No se encontró el vehículo con la placa proporcionada.' };
        }

        const vehiculoId = vehiculoResult.rows[0].id_vehiculo;

        // Actualizar la hora de salida y cambiar el estado del vehículo en la tabla de Vehiculos
        const updateVehiculoQuery = 'UPDATE Vehiculos SET Hora_Salida = NOW(), Estado = $1 WHERE Placa = $2';
        const updateVehiculoValues = ['Retirado', placa];
        await db.query(updateVehiculoQuery, updateVehiculoValues);

        // Actualizar el estado de la celda de estacionamiento a "Disponible"
        const updateCeldaQuery = 'UPDATE Celdas_Estacionamiento SET Estado = $1, id_vehiculo = NULL WHERE id_vehiculo = $2';
        const updateCeldaValues = ['Disponible', vehiculoId];
        await db.query(updateCeldaQuery, updateCeldaValues);

        return { success: true, message: 'Salida registrada correctamente.' };
    } catch (error) {
        console.error('Error al registrar la salida del vehículo:', error);
        return { success: false, message: 'Error al registrar la salida del vehículo.' };
    }
}

// Exporta las funciones para que estén disponibles para otros módulos
module.exports = {
    registrarEntrada,
    registrarSalida
};

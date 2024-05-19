// usuarios.js

const db = require('../databases/db'); // Importar la conexión a la base de datos



// Función para registrar la entrada de un vehículo
async function registrarEntrada(placa, marcaModelo, tipoServicio) {
    try {
        // Obtener el ID del usuario correspondiente a la placa
        const usuario = await db.query('SELECT ID_Usuario FROM Vehiculos WHERE Placa = $1', [placa]);
        const idUsuario = usuario.rows[0].ID_Usuario;

        // Insertar un nuevo registro de entrada en la tabla de vehículos
        const query = 'INSERT INTO Vehiculos (Placa, Marca, Modelo, Hora_Entrada, Tipo_Servicio, Estado, ID_Usuario) VALUES ($1, $2, $3, NOW(), $4, $5, $6)';
        const values = [placa, marcaModelo.marca, marcaModelo.modelo, tipoServicio, 'Entrada', idUsuario];
        await db.query(query, values);
        
        return { success: true, message: 'Entrada del vehículo registrada correctamente.' };
    } catch (error) {
        console.error('Error al registrar la entrada del vehículo:', error);
        return { success: false, message: 'Error al registrar la entrada del vehículo.' };
    }
}

// Función para registrar la salida de un vehículo
async function registrarSalida(placa) {
    try {
        // Actualizar el registro de salida en la tabla de vehículos
        const query = 'UPDATE Vehiculos SET Hora_Salida = NOW(), Estado = $1 WHERE Placa = $2 AND Estado = $3';
        const values = ['Salida', placa, 'Entrada'];
        await db.query(query, values);
        
        return { success: true, message: 'Salida del vehículo registrada correctamente.' };
    } catch (error) {
        console.error('Error al registrar la salida del vehículo:', error);
        return { success: false, message: 'Error al registrar la salida del vehículo.' };
    }
}

// Función para gestionar el pago de un usuario
async function gestionarPago(placa, totalAPagar) {
    try {
        // Insertar un nuevo registro de pago en la tabla de pagos
        const query = 'INSERT INTO Pagos (ID_Usuario, ID_Vehiculo, Fecha_Hora, Monto_Pagado, Metodo_Pago) VALUES ((SELECT ID_Usuario FROM Vehiculos WHERE Placa = $1), (SELECT ID_Vehiculo FROM Vehiculos WHERE Placa = $1), NOW(), $2, $3)';
        const values = [placa, totalAPagar, 'Efectivo']; // Se asume que el método de pago es en efectivo
        await db.query(query, values);

        // Actualizar el estado del vehículo
        await db.query('UPDATE Vehiculos SET Estado = $1 WHERE Placa = $2', ['Pagado', placa]);
        
        return { success: true, message: 'Pago gestionado correctamente.' };
    } catch (error) {
        console.error('Error al gestionar el pago:', error);
        return { success: false, message: 'Error al gestionar el pago.' };
    }
}

// Exporta las funciones para que estén disponibles para otros módulos
module.exports = {
    
    registrarEntrada,
    registrarSalida,
    gestionarPago
};

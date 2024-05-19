const db = require('../databases/db'); // Importar la conexión a la base de datos

// Función para procesar el pago de un usuario
async function procesarPago(id_usuario, id_vehiculo, monto_pagado, metodo_pago) {
    try {
        // Verificar si el usuario y el vehículo existen en el sistema
        const usuarioExistente = await db.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        const vehiculoExistente = await db.query('SELECT * FROM vehiculos WHERE id_vehiculo = $1', [id_vehiculo]);

        if (usuarioExistente.rows.length === 0 || vehiculoExistente.rows.length === 0) {
            return { success: false, message: 'El usuario o el vehículo no existen en el sistema.' };
        }

        // Registrar el pago en la tabla de pagos con la fecha y hora actual
        const query = 'INSERT INTO pagos (id_usuario, id_vehiculo, monto_pagado, metodo_pago, fecha_hora) VALUES ($1, $2, $3, $4, NOW())';
        const values = [id_usuario, id_vehiculo, monto_pagado, metodo_pago];
        await db.query(query, values);

        // Actualizar el estado del vehículo a "Pagado" en la tabla de vehiculos
        const updateQuery = 'UPDATE vehiculos SET estado = $1 WHERE id_vehiculo = $2';
        const updateValues = ['Pagado', id_vehiculo];
        await db.query(updateQuery, updateValues);

        return { success: true, message: 'Pago procesado correctamente.' };
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        return { success: false, message: 'Error al procesar el pago.' };
    }
}

// Exporta las funciones para que estén disponibles para otros módulos
module.exports = {
    procesarPago
};

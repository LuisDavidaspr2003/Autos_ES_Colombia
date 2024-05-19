const db = require('../databases/db');

// Función para obtener todas las celdas de estacionamiento disponibles
async function obtenerCeldasDisponibles() {
    try {
        const query = 'SELECT * FROM Celdas_Estacionamiento WHERE estado = $1';
        const values = ['Disponible'];
        const result = await db.query(query, values);
        return { success: true, celdas: result.rows };
    } catch (error) {
        console.error('Error al obtener las celdas de estacionamiento disponibles:', error);
        return { success: false, message: 'Error al obtener las celdas de estacionamiento disponibles.' };
    }
}

// Función para obtener todas las celdas de estacionamiento no disponibles
async function obtenerCeldasNoDisponibles() {
    try {
        const query = `
            SELECT ce.*, v.placa, v.marca, v.modelo 
            FROM Celdas_Estacionamiento ce 
            INNER JOIN Vehiculos v ON ce.id_vehiculo = v.id_vehiculo 
            WHERE ce.estado != $1
        `;
        const values = ['Disponible'];
        const result = await db.query(query, values);
        return { success: true, celdas: result.rows };
    } catch (error) {
        console.error('Error al obtener las celdas de estacionamiento no disponibles:', error);
        return { success: false, message: 'Error al obtener las celdas de estacionamiento no disponibles.' };
    }
}

// Función para asignar una celda de estacionamiento cuando el usuario ha realizado el pago
async function asignarCeldaEstacionamiento(placa) {
    try {
        // Verificar si el usuario ha realizado el pago
        const pagoRealizadoQuery = `
            SELECT * FROM Pagos 
            WHERE id_vehiculo = (
                SELECT id_vehiculo FROM Vehiculos WHERE placa = $1
            )
        `;
        const pagoRealizado = await db.query(pagoRealizadoQuery, [placa]);
        if (pagoRealizado.rows.length === 0) {
            return { success: false, message: 'El usuario no ha realizado el pago.' };
        }

        // Verificar si el vehículo ya tiene asignada una celda
        const celdaAsignadaQuery = 'SELECT * FROM Celdas_Estacionamiento WHERE id_vehiculo = (SELECT id_vehiculo FROM Vehiculos WHERE placa = $1)';
        const celdaAsignada = await db.query(celdaAsignadaQuery, [placa]);
        if (celdaAsignada.rows.length > 0) {
            return { success: false, message: 'El vehículo ya tiene asignada una celda de estacionamiento.' };
        }

        // Obtener una celda de estacionamiento disponible ordenada por ID
        const celdaDisponibleQuery = 'SELECT * FROM Celdas_Estacionamiento WHERE estado = $1 ORDER BY id_celda LIMIT 1';
        const celdaDisponible = await db.query(celdaDisponibleQuery, ['Disponible']);
        if (celdaDisponible.rows.length === 0) {
            console.log('Debug: No hay celdas disponibles - Query Result:', celdaDisponible.rows);
            return { success: false, message: 'No hay celdas de estacionamiento disponibles.' };
        }

        // Obtener los datos del vehículo
        const vehiculoQuery = 'SELECT * FROM Vehiculos WHERE placa = $1';
        const vehiculo = await db.query(vehiculoQuery, [placa]);
        if (vehiculo.rows.length === 0) {
            return { success: false, message: 'No se encontró el vehículo con la placa proporcionada.' };
        }

        // Asignar la celda al vehículo del usuario y cambiar el estado de la celda a "Estacionado"
        const asignarCeldaQuery = `
            UPDATE Celdas_Estacionamiento 
            SET estado = $1, 
                id_vehiculo = $2 
            WHERE id_celda = $3
        `;
        const values = [
            'Estacionado',
            vehiculo.rows[0].id_vehiculo,
            celdaDisponible.rows[0].id_celda
        ];
        await db.query(asignarCeldaQuery, values);

        return { success: true, message: 'Celda de estacionamiento asignada correctamente.' };
    } catch (error) {
        console.error('Error al asignar la celda de estacionamiento:', error);
        return { success: false, message: 'Error al asignar la celda de estacionamiento.' };
    }
}

// Función para agregar una nueva celda de estacionamiento, solo accesible por administradores
async function agregarCeldaEstacionamiento(idAdministrador, estado, tipoServicio) {
    try {
        // Verificar si el usuario es administrador
        const adminCheckQuery = 'SELECT * FROM Administradores WHERE ID_Administrador = $1';
        const adminCheckResult = await db.query(adminCheckQuery, [idAdministrador]);
        
        if (adminCheckResult.rows.length === 0) {
            return { success: false, message: 'El usuario no tiene permisos de administrador.' };
        }

        // Determinar el siguiente número de celda según el tipo de servicio
        let prefix;
        if (tipoServicio === 'General') {
            prefix = 'A';
        } else if (tipoServicio === 'VIP') {
            prefix = 'V';
        } else {
            return { success: false, message: 'Tipo de servicio no válido.' };
        }

        // Obtener el número de celda más alto existente para el tipo de servicio
        const maxNumeroCeldaQuery = `
            SELECT MAX(SUBSTRING(numero_celda FROM 2)::int) AS max_numero_celda
            FROM Celdas_Estacionamiento
            WHERE SUBSTRING(numero_celda FROM 1 FOR 1) = $1
        `;
        const maxNumeroCeldaResult = await db.query(maxNumeroCeldaQuery, [prefix]);
        const maxNumeroCelda = maxNumeroCeldaResult.rows[0].max_numero_celda || 0;
        const nuevoNumeroCelda = `${prefix}${maxNumeroCelda + 1}`;

        // Insertar la nueva celda de estacionamiento
        const insertQuery = 'INSERT INTO Celdas_Estacionamiento (numero_celda, estado, tipo_servicio) VALUES ($1, $2, $3)';
        const insertValues = [nuevoNumeroCelda, estado, tipoServicio];
        await db.query(insertQuery, insertValues);

        return { success: true, message: 'Celda de estacionamiento agregada correctamente', numeroCelda: nuevoNumeroCelda };
    } catch (error) {
        console.error('Error al agregar celda de estacionamiento:', error);
        return { success: false, message: 'Error al agregar celda de estacionamiento' };
    }
}

module.exports = {
    obtenerCeldasDisponibles,
    obtenerCeldasNoDisponibles,
    asignarCeldaEstacionamiento,
    agregarCeldaEstacionamiento
};

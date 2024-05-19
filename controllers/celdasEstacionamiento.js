const celdasEstacionamientoModule = require('../models/celdasEstacionamiento'); // Importar el módulo de celdas de estacionamiento

// Función para obtener todas las celdas de estacionamiento disponibles
async function obtenerCeldasDisponibles(req, res) {
    try {
        // Consultar todas las celdas de estacionamiento que estén disponibles
        const resultado = await celdasEstacionamientoModule.obtenerCeldasDisponibles();
        res.json(resultado);
    } catch (error) {
        console.error('Error al obtener las celdas de estacionamiento disponibles:', error);
        res.status(500).json({ success: false, message: 'Error al obtener las celdas de estacionamiento disponibles.' });
    }
}

// Función para obtener todas las celdas de estacionamiento no disponibles
async function obtenerCeldasNoDisponibles(req, res) {
    try {
        // Consultar todas las celdas de estacionamiento que no estén disponibles y el vehículo que las ocupa
        const resultado = await celdasEstacionamientoModule.obtenerCeldasNoDisponibles();
        res.json(resultado);
    } catch (error) {
        console.error('Error al obtener las celdas de estacionamiento no disponibles:', error);
        res.status(500).json({ success: false, message: 'Error al obtener las celdas de estacionamiento no disponibles.' });
    }
}

// Función para asignar una celda de estacionamiento a un vehículo
async function asignarCeldaEstacionamiento(req, res) {
    const { placa } = req.body;
    try {
        const resultado = await celdasEstacionamientoModule.asignarCeldaEstacionamiento(placa);
        res.json(resultado);
    } catch (error) {
        console.error('Error al asignar la celda de estacionamiento:', error);
        res.status(500).json({ success: false, message: 'Error al asignar la celda de estacionamiento.' });
    }
}

async function agregarCeldaEstacionamiento(req, res) {
    const { idAdministrador, estado, tipoServicio } = req.body;
    try {
        const resultado = await celdasEstacionamientoModule.agregarCeldaEstacionamiento(idAdministrador, estado, tipoServicio);
        res.json(resultado);
    } catch (error) {
        console.error('Error al agregar celda de estacionamiento:', error);
        res.status(500).json({ success: false, message: 'Error al agregar celda de estacionamiento' });
    }
}


// Exportar los controladores para que estén disponibles para otros archivos
module.exports = {
    obtenerCeldasDisponibles,
    obtenerCeldasNoDisponibles,
    asignarCeldaEstacionamiento,
    agregarCeldaEstacionamiento
};

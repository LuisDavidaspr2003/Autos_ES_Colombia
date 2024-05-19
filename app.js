const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Importar las rutas de los diferentes módulos
const administradorRoutes = require('./routes/administrador');
const celdasEstacionamientoRoutes = require('./routes/celdasEstacionamiento');
const entradasSalidasRoutes = require('./routes/entradas_salidas');
const pagosRoutes = require('./routes/pagos');
const usuariosRoutes = require('./routes/usuarios');
const vehiculosRoutes = require('./routes/vehiculos');

// Configuración del middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de los diferentes módulos
app.use('/administrador', administradorRoutes);
app.use('/celdas-estacionamiento', celdasEstacionamientoRoutes);
app.use('/entradas-salidas', entradasSalidasRoutes);
app.use('/pagos', pagosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/vehiculos', vehiculosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡La aplicación está funcionando correctamente!');
});

module.exports = app;

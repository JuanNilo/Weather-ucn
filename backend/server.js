const path = require('path'); 
// Carga las variables de entorno desde el archivo .env en la raíz del proyecto
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 
const express = require('express');
const cors = require('cors');
const cron = require('node-cron'); // Importar node-cron

const { handleData } = require('./dataHandler'); // Importar la función handleData

// Importar PrismaClient, la instancia de PrismaClient y el modelo de datos
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();

const app = express();
const port = 80;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para verificar el estado del servidor
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Ruta que retorna todos los datos almacenados en la base de datos
app.get('/api/data', async (req, res) => {
    try {
        const data = await prisma.datosMeteorologicos.findMany();
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Ruta que retorna los datos almacenados en la base de datos para una fecha específica
// URL de ejemplo: http://localhost:3000/api/data/2025-01-29T00:00:00.000Z
// Formato de fecha: YYYY-MM-DDTHH:MM:SS.MSZ 
app.get('/api/data/:fecha', async (req, res) => {
    try {
        const { fecha } = req.params;
        const data = await prisma.datosMeteorologicos.findMany({
            where: {
                fecha
            }
        });
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Ruta que retorna los datos almacenados en la base de datos para un intervalo de fechas
// URL de ejemplo: http://localhost:3000/api/data/2025-01-29T00:00:00.000Z/2025-01-30T00:00:00.000Z
// Formato de fecha: YYYY-MM-DDTHH:MM:SS.MSZ
app.get('/api/data/:fechaInicio/:fechaFin', async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const data = await prisma.datosMeteorologicos.findMany({
            where: {
                fecha: {
                    gte: fechaInicio,
                    lte: fechaFin
                }
            }
        });
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Ruta que actualiza los datos almacenados en la base de datos de manera manual para la fecha de hoy
app.get('/api/update', async (req, res) => {
    try {
        await handleData();
        res.send('Datos actualizados correctamente.');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Recargar los datos cada hora segun lo acordado con Ceaza
// La tarea se ejecuta a los 40 minutos de cada hora
cron.schedule('40 * * * *', async () => {
    try {
        console.log('Ejecutando handleData...');
        await handleData();
        console.log('Datos actualizados correctamente.');
    } catch (err) {
        console.error('Error al ejecutar handleData:', err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
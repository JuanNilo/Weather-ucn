require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path'); // Importar el módulo path
const { handleData } = require('./dataHandler'); // Importar la función handleData
const cron = require('node-cron'); // Importar node-cron
const prisma = new PrismaClient();
const app = express();
const port = 80;

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

// Ruta que llama a la funcion handleData para actualizar los datos
app.get('/api/update', async (req, res) => {
    try {
        await handleData();
        res.send('Datos actualizados correctamente.');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Configurar un trabajo cron para ejecutar handleData una vez por hora
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
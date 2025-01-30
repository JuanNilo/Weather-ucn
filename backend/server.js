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
app.use(express.json()); // Middleware para parsear JSON

// Ruta para obtener la temperatura
app.get('/api/temperature', async (req, res) => {
    try {
        const temperature = await prisma.temperature.findFirst();
        res.json(temperature);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Ruta para verificar el estado del servidor
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Ruta para agregar una nueva temperatura
app.post('/api/temperature', async (req, res) => {
    try {
        const { day, temperature } = req.body;
        const newTemp = await prisma.temperature.create({
            data: {
                day,
                temperature
            }
        });
        res.json(newTemp);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Ruta para obtener los datos de la base de datos
app.get('/api/data', async (req, res) => {
    try {
        const data = await prisma.datosMeteorologicos.findMany();
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Ruta para subir datos meteorológicos
app.post('/api/datos-meteorologicos', async (req, res) => {
    try {
        const result = await handleData();
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Configurar un trabajo cron para ejecutar handleData una vez por hora
cron.schedule('51 * * * *', async () => {
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
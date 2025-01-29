require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path'); // Importar el módulo path
const prisma = new PrismaClient();
const app = express();
const port = 443;

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

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
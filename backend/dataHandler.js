const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const { format } = require('date-fns'); // Importar la función format de date-fns
const prisma = new PrismaClient();


// Función para obtener los datos de la API y guardarlos en la base de datos
async function handleData() {
    try {
        // Obtener la fecha actual en foramto: YYYY-MM-DDTHH:MM:SS.MSZ
        const today = format(new Date(), 'yyyy-MM-dd'); 

        // Obtener los datos de la API de los sensores de la estación meteorológica
        const responseTemp = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGTA&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`);
        const responseHumedad = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGHR&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`);
        const responseViento = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGVV&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`);
        const responsePresion = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGPA&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`);

        const rawDataTemp = responseTemp.data;
        const rawDataHumedad = responseHumedad.data;
        const rawDataViento = responseViento.data;
        const rawDataPresion = responsePresion.data;

        const linesTemp = rawDataTemp.split('\n');
        const linesHumedad = rawDataHumedad.split('\n');
        const linesViento = rawDataViento.split('\n');
        const linesPresion = rawDataPresion.split('\n');

        // Filtra los datos para obtener la informacion de la temperatura, humedad, viento y presion
        // y los guarda en un arreglo de objetos
        // Ignora las lecturas que no tienen datos para evitar errores
        const dataTemp = linesTemp
            .filter((line) => line.startsWith('UCNGTA') && line.split(',')[2] !== '')
            .map((line) => {
                const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                const [fecha, horaCompleta] = ultima_lectura.split(' ');
                const [hora, minutos] = horaCompleta.split(':');
                const horaFormateada = `${hora}:${minutos}`;
                return { fecha, hora: horaFormateada, prom: parseFloat(prom) };
            });

        const dataHumedad = linesHumedad
            .filter((line) => line.startsWith('UCNGHR') && line.split(',')[2] !== '')
            .map((line) => {
                const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                const [fecha, horaCompleta] = ultima_lectura.split(' ');
                const [hora, minutos] = horaCompleta.split(':');
                const horaFormateada = `${hora}:${minutos}`;
                return { fecha, hora: horaFormateada, humedad: parseFloat(prom) };
            });

        const dataViento = linesViento
            .filter((line) => line.startsWith('UCNGVV') && line.split(',')[2] !== '')
            .map((line) => {
                const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                const [fecha, horaCompleta] = ultima_lectura.split(' ');
                const [hora, minutos] = horaCompleta.split(':');
                const horaFormateada = `${hora}:${minutos}`;
                return { fecha, hora: horaFormateada, viento: parseFloat(prom) };
            });

        const dataPresion = linesPresion
            .filter((line) => line.startsWith('UCNGPA') && line.split(',')[2] !== '')
            .map((line) => {
                const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                const [fecha, horaCompleta] = ultima_lectura.split(' ');
                const [hora, minutos] = horaCompleta.split(':');
                const horaFormateada = `${hora}:${minutos}`;
                return { fecha, hora: horaFormateada, presion: parseFloat(prom) };
            });

        // Combinar los datos de temperatura, humedad, viento y presion en un solo arreglo
        // Asegurarse de que los datos estén ordenados de manera ascendente 
        // Para que coincidan con el orden de la base de datos
        const combinedData = dataTemp.map(tempItem => {
            const humedadItem = dataHumedad.find(humItem => humItem.fecha === tempItem.fecha && humItem.hora === tempItem.hora);
            const vientoItem = dataViento.find(vientoItem => vientoItem.fecha === tempItem.fecha && vientoItem.hora === tempItem.hora);
            const presionItem = dataPresion.find(presionItem => presionItem.fecha === tempItem.fecha && presionItem.hora === tempItem.hora);
            return {
                ...tempItem,
                humedad: humedadItem ? humedadItem.humedad : NaN,
                viento: vientoItem ? vientoItem.viento : NaN,
                presion: presionItem ? presionItem.presion : NaN,
                temperatura: tempItem.prom // Asegurarse de que el campo temperatura esté presente
            };
        }).reverse();

        // Filtrar datos nulos y NaN antes de subirlos a la base de datos
        const validData = combinedData.filter(dato => !isNaN(dato.temperatura) && !isNaN(dato.humedad) && !isNaN(dato.viento) && !isNaN(dato.presion));

        // Subir los datos combinados a la base de datos
        // Usar el campo temperatura en lugar de promedio
        // Asignar un valor por defecto si no está disponible
        // Omitir duplicados
        const result = await prisma.datosMeteorologicos.createMany({
            data: validData.map(dato => ({
                fecha: new Date(dato.fecha),
                hora: dato.hora,
                temperatura: dato.temperatura, // Usar el campo temperatura
                velocidadViento: dato.viento,
                humedad: dato.humedad,
                presionAtmosferica: dato.presion,
                radiacionUV: 0, // Asignar un valor por defecto si no está disponible
                salinidad: 0 // Asignar un valor por defecto si no está disponible
            })),
            skipDuplicates: true // Omitir duplicados
        });

        return result;
    } catch (error) {
        console.error('Error fetching or saving data:', error);
        throw error;
    }
}

module.exports = { handleData };
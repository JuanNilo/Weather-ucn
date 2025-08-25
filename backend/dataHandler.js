const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const { format } = require('date-fns'); // Importar la función format de date-fns
const prisma = new PrismaClient();



        // ============================================================================================================================= //
        //                         En caso de que los sensores de salinidad y radiación solar estén habilitados                          //
        //                         Descomentar las lineas de codigo relacionadas a estos sensores para obtener los datos                 //
        // ============================================================================================================================= //

// Función para obtener los datos de la API y guardarlos en la base de datos
async function handleData() {
    try {
        // Obtener la fecha actual en foramto: YYYY-MM-DD
        const today = format(new Date(), 'yyyy-MM-dd'); 

        // Obtener los datos de la API de los sensores de la estación meteorológica
        const responseTemp = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGTA&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`);
        const responseHumedad = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGHR&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`);
        const responseViento = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGVV&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`);
        const responsePresion = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGPA&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`);
        
        // const responseSalinidad = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGSM&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`)
        // const responseRadiacionSolar = await axios.get(`https://www.ceazamet.cl/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGRS&fecha_inicio=${today}&fecha_fin=${today}&user=mlotito@ucn.cl`)

        const rawDataTemp = responseTemp.data;
        const rawDataHumedad = responseHumedad.data;
        const rawDataViento = responseViento.data;
        const rawDataPresion = responsePresion.data;

        // const rawDataRadiacionSolar = responseRadiacionSolar.data;
        // const rawDataSalinidad = responseSalinidad.data;

        const linesTemp = rawDataTemp.split('\n');
        const linesHumedad = rawDataHumedad.split('\n');
        const linesViento = rawDataViento.split('\n');
        const linesPresion = rawDataPresion.split('\n');
        
        // const linesSalinidad = rawDataSalinidad.split('\n');
        // const linesRadiacionSolar = rawDataRadiacionSolar.split('\n');


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
            
        // ============================================================================================================================= //

        // const dataSalinidad = linesSalinidad
        //         .filter((line) => line.startsWith('UCNGSM') && line.split(',')[2] !== '')
        //         .map((line) => {
        //             const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
        //             const [fecha, horaCompleta] = ultima_lectura.split(' ');
        //             const [hora, minutos] = horaCompleta.split(':');
        //             const horaFormateada = `${hora}:${minutos}`;
        //             return { fecha, hora: horaFormateada, salinidad: parseFloat(prom) };
        //         });

        // const dataRadiacionSolar = linesRadiacionSolar
        //     .filter((line) => line.startsWith('UCNGRS') && line.split(',')[2] !== '')
        //     .map((line) => {
        //         const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
        //         const [fecha, horaCompleta] = ultima_lectura.split(' ');
        //         const [hora, minutos] = horaCompleta.split(':');
        //         const horaFormateada = `${hora}:${minutos}`;
        //         return { fecha, hora: horaFormateada, radiacion: parseFloat(prom) };
        //     });

        // ============================================================================================================================= //

        // Combinar los datos de temperatura, humedad, viento y presion en un solo arreglo
        // Asegurarse de que los datos estén ordenados de manera ascendente 
        // Para que coincidan con el orden de la base de datos
        const combinedData = dataTemp.map(tempItem => {
            const humedadItem = dataHumedad.find(humItem => humItem.fecha === tempItem.fecha && humItem.hora === tempItem.hora);
            const vientoItem = dataViento.find(vientoItem => vientoItem.fecha === tempItem.fecha && vientoItem.hora === tempItem.hora);
            const presionItem = dataPresion.find(presionItem => presionItem.fecha === tempItem.fecha && presionItem.hora === tempItem.hora);
            
            // const radiacionItem = dataRadiacionSolar.find(radiacionItem => radiacionItem.fecha === tempItem.fecha && radiacionItem.hora === tempItem.hora);
            // const salinidadItem = dataSalinidad.find(salinidadItem => salinidadItem.fecha === tempItem.fecha && salinidadItem.hora === tempItem.hora);
            
            return {
                ...tempItem,
                humedad: humedadItem ? humedadItem.humedad : NaN,
                viento: vientoItem ? vientoItem.viento : NaN,
                presion: presionItem ? presionItem.presion : NaN,
                temperatura: tempItem.prom,// Asegurarse de que el campo temperatura esté presente
                // radiacion: radiacionItem ? radiacionItem.radiacion : NaN,
                // salinidad: salinidadItem ? salinidadItem.salinidad : NaN,
            };
        }).reverse();

        // Filtrar datos nulos y NaN antes de subirlos a la base de datos
        const validData = combinedData.filter(dato => !isNaN(dato.temperatura) && !isNaN(dato.humedad) && !isNaN(dato.viento) && !isNaN(dato.presion
            // && !isNaN(dato.radiacion) && !isNaN(dato.salinidad)
        ));

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
                radiacionUV: 0, // dato.radiacion || Asignar un valor por defecto si no está disponible
                salinidad: 0 // dato.salinidad || Asignar un valor por defecto si no está disponible

            })),
            skipDuplicates: true // Omitir duplicados
        });

        return result;
    } catch (error) {
        console.error('Error fetching or saving data:', error);
        throw error;
    }
}

// ========= FUNCIÓN PARA OBTENER Y GUARDAR DATOS ENTRE DOS FECHAS =========
async function handleDataByRange(startDate, endDate) {
    try {
        const baseUrl = "https://www.ceazamet.cl/ws/pop_ws.php";
        const user = "mlotito@ucn.cl";

        // Sensores disponibles
        const sensores = {
            temperatura: "UCNGTA",
            humedad: "UCNGHR",
            viento: "UCNGVV",
            presion: "UCNGPA"
            // radiacion: "UCNGRS",
            // salinidad: "UCNGSM"
        };

        const fetchSensor = async (sensorCode) => {
            const url = `${baseUrl}?fn=GetSerieSensor&p_cod=ceazamet&s_cod=${sensorCode}&fecha_inicio=${startDate}&fecha_fin=${endDate}&user=${user}`;
            const res = await axios.get(url);
            return res.data.split('\n').filter(l => l.startsWith(sensorCode) && l.split(',')[2] !== '');
        };

        // Obtener y procesar los datos de todos los sensores
        const procesar = (lines, key) =>
            lines.map(line => {
                const [, lectura, , prom] = line.split(',');
                const [fecha, horaCompleta] = lectura.split(' ');
                const [hora, minutos] = horaCompleta.split(':');
                return { fecha, hora: `${hora}:${minutos}`, [key]: parseFloat(prom) };
            });

        const linesTemp = await fetchSensor(sensores.temperatura);
        const linesHum = await fetchSensor(sensores.humedad);
        const linesViento = await fetchSensor(sensores.viento);
        const linesPresion = await fetchSensor(sensores.presion);

        const dataTemp = procesar(linesTemp, 'temperatura');
        const dataHum = procesar(linesHum, 'humedad');
        const dataViento = procesar(linesViento, 'viento');
        const dataPresion = procesar(linesPresion, 'presion');

        // Combinar datos por fecha y hora
        const combined = dataTemp.map(item => {
            const hum = dataHum.find(d => d.fecha === item.fecha && d.hora === item.hora);
            const viento = dataViento.find(d => d.fecha === item.fecha && d.hora === item.hora);
            const presion = dataPresion.find(d => d.fecha === item.fecha && d.hora === item.hora);

            return {
                ...item,
                humedad: hum?.humedad ?? NaN,
                viento: viento?.viento ?? NaN,
                presion: presion?.presion ?? NaN
            };
        }).filter(d => !isNaN(d.temperatura) && !isNaN(d.humedad) && !isNaN(d.viento) && !isNaN(d.presion));

        // Insertar en base de datos
        const result = await prisma.datosMeteorologicos.createMany({
            data: combined.map(d => ({
                fecha: new Date(d.fecha),
                hora: d.hora,
                temperatura: d.temperatura,
                humedad: d.humedad,
                velocidadViento: d.viento,
                presionAtmosferica: d.presion,
                radiacionUV: 0,
                salinidad: 0
            })),
            skipDuplicates: true
        });

        console.log(`✅ Datos insertados: ${result.count}`);
        return result;

    } catch (error) {
        console.error("❌ Error al procesar datos por rango:", error.message);
        throw error;
    }
}

module.exports = { handleData, handleDataByRange };
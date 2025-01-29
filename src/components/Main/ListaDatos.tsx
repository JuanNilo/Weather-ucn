import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

interface DataItem {
    fecha: string;
    viento: number;
    hora: string
    humedad: number;
    prom: number;
    presion: number;
}

function ListaDatos() {
    const [data, setData] = useState<DataItem[]>([]);

    async function handleData() {
        try {
            const responseTemp = await axios.get('/api/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGTA&fecha_inicio=2025-01-29&fecha_fin=2025-01-29&user=mlotito@ucn.cl');
            const responseHumedad = await axios.get('/api/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGHR&fecha_inicio=2025-01-29&fecha_fin=2025-01-29&user=mlotito@ucn.cl');
            const responseViento = await axios.get('/api/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGVV&fecha_inicio=2025-01-29&fecha_fin=2025-01-29&user=mlotito@ucn.cl');
            const responsePresion = await axios.get('/api/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGPA&fecha_inicio=2025-01-29&fecha_fin=2025-01-29&user=mlotito@ucn.cl');

            const rawDataTemp = responseTemp.data;
            const rawDataHumedad = responseHumedad.data;
            const rawDataViento = responseViento.data;
            const rawDataPresion = responsePresion.data;

            const linesTemp = rawDataTemp.split('\n');
            const linesHumedad = rawDataHumedad.split('\n');
            const linesViento = rawDataViento.split('\n');
            const linesPresion = rawDataPresion.split('\n');

            const dataTemp = linesTemp
                .filter((line: string) => line.startsWith('UCNGTA'))
                .map((line: string) => {
                    const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                    const [fecha, horaCompleta] = ultima_lectura.split(' ');
                    const [hora, minutos] = horaCompleta.split(':');
                    const horaFormateada = `${hora}:${minutos}`;
                    return { fecha, hora: horaFormateada, prom: parseFloat(prom) };
                });

            const dataHumedad = linesHumedad
                .filter((line: string) => line.startsWith('UCNGHR'))
                .map((line: string) => {
                    const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                    const [fecha, horaCompleta] = ultima_lectura.split(' ');
                    const [hora, minutos] = horaCompleta.split(':');
                    const horaFormateada = `${hora}:${minutos}`;
                    return { fecha, hora: horaFormateada, humedad: parseFloat(prom) };
                });

            const dataViento = linesViento
                .filter((line: string) => line.startsWith('UCNGVV'))
                .map((line: string) => {
                    const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                    const [fecha, horaCompleta] = ultima_lectura.split(' ');
                    const [hora, minutos] = horaCompleta.split(':');
                    const horaFormateada = `${hora}:${minutos}`;
                    return { fecha, hora: horaFormateada, viento: parseFloat(prom) };
                });

            const dataPresion = linesPresion
                .filter((line: string) => line.startsWith('UCNGPA'))
                .map((line: string) => {
                    const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                    const [fecha, horaCompleta] = ultima_lectura.split(' ');
                    const [hora, minutos] = horaCompleta.split(':');
                    const horaFormateada = `${hora}:${minutos}`;
                    return { fecha, hora: horaFormateada, presion: parseFloat(prom) };
                });

            const combinedData = dataTemp.map(tempItem => {
                const humedadItem = dataHumedad.find(humItem => humItem.fecha === tempItem.fecha && humItem.hora === tempItem.hora);
                const vientoItem = dataViento.find(vientoItem => vientoItem.fecha === tempItem.fecha && vientoItem.hora === tempItem.hora);
                const presionItem = dataPresion.find(presionItem => presionItem.fecha === tempItem.fecha && presionItem.hora === tempItem.hora);
                return {
                    ...tempItem,
                    humedad: humedadItem ? humedadItem.humedad : 0,
                    viento: vientoItem ? vientoItem.viento : 0,
                    presion: presionItem ? presionItem.presion : 0
                };
            }).reverse();

            setData(combinedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        handleData();
    }
        , []);
    return (


        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 border-[1px] border-gray-300  shadow-lg">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100 border-[1px] border-gray-300 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Hora
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Viento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Temperatura
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Indice UV
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Humedad
                        </ th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Presión atmosférica
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Salinidad
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={index}>
                            <td className="px-6 py-3">{item.fecha}</td>
                            <td className="px-6 py-3">{item.hora}</td>
                            <td className="px-6 py-3">{item.viento.toFixed(1)} m/s</td>
                            <td className="px-6 py-3">{item.prom.toFixed(1)} °C</td>
                            <td className="px-6 py-3">-</td>
                            <td className="px-6 py-3">{item.humedad.toFixed(1)}%</td>
                            <td className="px-6 py-3 text-center">{item.presion.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default ListaDatos;
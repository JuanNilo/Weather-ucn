import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

interface DataItem {
    s_cod: string;
    fecha: string;
    hora: string
    min: number;
    prom: number;
    max: number;
    data_pc: number;
}

function ListaDatos() {
    const [data, setData] = useState<DataItem[]>([]);

    async function handleData() {
        try {
            const response = await axios.get('/api/ws/pop_ws.php?fn=GetSerieSensor&p_cod=ceazamet&s_cod=UCNGTA&fecha_inicio=2025-01-29&fecha_fin=2025-01-29&user=mlotito@ucn.cl');
            const rawData = response.data;
            const lines = rawData.split('\n');
            const filteredData = lines
                .filter((line: string) => line.startsWith('UCNGTA'))
                .map((line: string) => {
                    const [s_cod, ultima_lectura, min, prom, max, data_pc] = line.split(',');
                    const [fecha, horaCompleta] = ultima_lectura.split(' ');
                    const [hora, minutos] = horaCompleta.split(':');
                    const horaFormateada = `${hora}:${minutos}`;
                    return { s_cod, fecha, hora: horaFormateada, min: parseFloat(min), prom: parseFloat(prom), max: parseFloat(max), data_pc: parseInt(data_pc) };
                })
                .reverse();
            setData(filteredData);
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
                <thead className="text-xs text-gray-700 uppercase bg-slate-100 border-[1px] border-gray-300 dark:bg-gray-700 dark:text-gray-400">
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
                        <th scope="col" className="px-6 py-3">
                            Presión atmosférica
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Salinidad
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={index}>
                            <td className="px-6 py-3">{item.fecha}</td>
                            <td className="px-6 py-3">{item.hora}</td>
                            <td className="px-6 py-3">-</td>
                            <td className="px-6 py-3">{item.prom.toFixed(1)} °C</td>
                            <td className="px-6 py-3">-</td>
                            <td className="px-6 py-3">-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default ListaDatos;
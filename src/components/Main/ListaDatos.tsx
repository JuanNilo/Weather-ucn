import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

interface DataItem {
    fecha: string;
    hora: string;
    temperatura: number;
    velocidadViento: number;
    humedad: number;
    radiacionUV: number;
    presionAtmosferica: number;
    salinidad: number;
}

function ListaDatos() {
    const [data, setData] = useState<DataItem[]>([]);

    const handleData = async () => {
        const response = await axios.get("http://localhost:80/api/data/");
        const formattedData = response.data.map((item: DataItem) => {
            const date = new Date(item.fecha);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
            return {
                ...item,
                fecha: formattedDate
            };
        }).sort((a: DataItem, b: DataItem) => {
            const dateA = new Date(`${a.fecha.split('-').reverse().join('-')}T${a.hora}`);
            const dateB = new Date(`${b.fecha.split('-').reverse().join('-')}T${b.hora}`);
            return dateB.getTime() - dateA.getTime();
        });
        setData(formattedData);
        console.log("data", formattedData);
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
                            <td className="px-6 py-3">{item.velocidadViento.toFixed(1)} m/s</td>
                            <td className="px-6 py-3">{item.temperatura.toFixed(1)} °C</td>
                            <td className="px-6 py-3">-</td>
                            <td className="px-6 py-3">{item.humedad.toFixed(1)}%</td>
                            <td className="px-6 py-3 text-center">{item.presionAtmosferica.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default ListaDatos;
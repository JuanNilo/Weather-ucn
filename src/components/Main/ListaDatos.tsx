import { useEffect, useState } from "react";
import axios from "axios";

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

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const handleData = async () => {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0); // Ajustar la hora a 00:00:00.000Z
        const todayISOString = today.toISOString(); // Obtener la fecha de hoy en formato YYYY-MM-DDTHH:mm:ss.sssZ
        console.log("today", todayISOString);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/${todayISOString}`);
        const formattedData = response.data.map((item: DataItem) => {
            const date = new Date(item.fecha);
            const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCFullYear()}`;
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

    const downloadCSV = () => {
        const headers = ["Fecha", "Hora", "Temperatura", "Velocidad Viento", "Humedad", "Radiación UV", "Presión Atmosférica", "Salinidad"];
        const rows = data.map(item => [
            item.fecha,
            item.hora,
            item.temperatura.toFixed(1),
            item.velocidadViento.toFixed(1),
            item.humedad.toFixed(1),
            item.radiacionUV.toFixed(1),
            item.presionAtmosferica.toFixed(1),
            item.salinidad.toFixed(1)
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "datos_meteorologicos.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleRangeData = async () => {
        const formattedStartDate = new Date(startDate);
        formattedStartDate.setUTCHours(0, 0, 0, 0);
        const formattedStartDateISOString = formattedStartDate.toISOString();
        console.log('startDate', formattedStartDateISOString);

        const formattedEndDate = new Date(endDate);
        formattedEndDate.setUTCHours(0, 0, 0, 0);
        const formattedEndDateISOString = formattedEndDate.toISOString();
        console.log('endDate', formattedEndDateISOString);


        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/${formattedStartDateISOString}/${formattedEndDateISOString}`);
        const formattedData = response.data.map((item: DataItem) => {
            const date = new Date(item.fecha);
            const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCFullYear()}`;
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
    }, []);

    return (
        <div className="relative overflow-x-auto">
            <h2 className="text-3xl font-semibold mb-4">Datos Meteorológicos</h2>
            <div className="mb-4 flex items-center justify-between">
                <button onClick={downloadCSV} className=" px-4 py-2 bg-[#23415b] font-semibold text-white rounded">Descargar CSV</button>
                <label className="mr-2">Desde:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-slate-100 border-[1px] border-gray-300 p-2 rounded-md" />
                <label className="mr-2">Hasta:</label>
                <input type="date" className="bg-slate-100 border-[1px] border-gray-300 p-2 rounded-md" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleRangeData} className="ml-4 px-4 py-2 font-semibold bg-[#23415b] text-white rounded">Buscar</button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-800  border-[1px] border-gray-300 shadow-lg">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100 border-[1px] border-gray-300 ">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">Fecha</th>
                        <th scope="col" className="px-6 py-3 font-medium">Hora</th>
                        <th scope="col" className="px-6 py-3 font-medium">Temperatura</th>
                        <th scope="col" className="px-6 py-3 font-medium">Velocidad Viento</th>
                        <th scope="col" className="px-6 py-3 font-medium">Humedad</th>
                        <th scope="col" className="px-6 py-3 font-medium">Radiación UV</th>
                        <th scope="col" className="px-6 py-3 font-medium">Presión Atmosférica</th>
                        <th scope="col" className="px-6 py-3 font-medium">Salinidad</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-3">{item.fecha}</td>
                            <td className="px-6 py-3">{item.hora}</td>
                            <td className="px-6 py-3">{item.temperatura.toFixed(1)}</td>
                            <td className="px-6 py-3">{item.velocidadViento.toFixed(1)}</td>
                            <td className="px-6 py-3">{item.humedad.toFixed(1)}</td>
                            <td className="px-6 py-3">{item.radiacionUV.toFixed(1)}</td>
                            <td className="px-6 py-3">{item.presionAtmosferica.toFixed(1)}</td>
                            <td className="px-6 py-3">{item.salinidad.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaDatos;
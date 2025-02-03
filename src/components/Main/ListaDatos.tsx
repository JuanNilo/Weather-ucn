import { useEffect, useState } from "react";
import axios from "axios";
import { FaTimesCircle } from "react-icons/fa";

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

    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 24;

    // Mensaje de error
    const [error, setError] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    // Mensaje de cargando
    const [loading, setLoading] = useState<boolean>(false);


    // Función para obtener los datos de la API
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
        setShowError(false);
        setError("");
        if (startDate === "" || endDate === "") {
            setError("Debe seleccionar una fecha de inicio y una fecha de término.");
            setShowError(true);
            return;
        }
        if (startDate > endDate) {
            setError("La fecha de inicio no puede ser mayor a la fecha de término.");
            setShowError(true);
            return;
        }
        setLoading(true);
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
        // tiempo de espera 5 segundos
        setTimeout(() => {
            setLoading(false);
        }, 5000);
        setLoading(false);
        console.log("data", formattedData);
    }

    useEffect(() => {
        handleData();
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber: number) => { setCurrentPage(pageNumber); }

    return (
        <div className="relative w-[100%]">
            <div className="flex justify-between mb-2">
                <h1 className="text-3xl text-[#A45248] font-bold">Condiciones atmosféricas UCN - Coquimbo</h1>
                {
                    showError && (
                        <div className=" w-[50%] h-10 rounded-md border-[1px] border-red-600 bg-red-100 flex justify-between items-center p-4">
                            <p>{error}</p>
                            <button onClick={() => setShowError(false)}>
                                <FaTimesCircle className="text-red-700" size={22} />
                            </button>
                        </div>
                    )
                }

            </div>
            <div className="mb-4 grid grid-cols-1 md:flex gap-y-2  items-center justify-between">
                <button onClick={downloadCSV} className=" px-4 py-2 bg-[#23415b] font-semibold text-white rounded">Descargar CSV</button>
                <label className="mr-2">Desde:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-slate-100 border-[1px] border-gray-300 p-2 rounded-md" />
                <label className="mr-2">Hasta:</label>
                <input type="date" className="bg-slate-100 border-[1px] border-gray-300 p-2 rounded-md" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleRangeData} className="md:ml-4 md:w-32 px-4 py-2 font-semibold bg-[#23415b] text-white rounded">
                    {loading ? "Cargando..." : "Buscar"}
                </button>
            </div>
            <div className=" overflow-scroll">

                <table className=" md:w-full text-sm text-left rtl:text-right text-gray-800 overflow-x-scroll  border-[1px] border-gray-300 shadow-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-slate-100 border-[1px] border-gray-300 ">
                        <tr className="text-center">
                            <th scope="col" className="px-6 py-3 font-medium">Fecha</th>
                            <th scope="col" className="px-6 py-3 font-medium">Hora</th>
                            <th scope="col" className="px-6 py-3 font-medium">Temperatura</th>
                            <th scope="col" className="px-6 py-3 font-medium">Velocidad Viento</th>
                            <th scope="col" className="px-6 py-3 font-medium">Humedad</th>
                            {/* <th scope="col" className="px-6 py-3 font-medium">Radiación UV</th> */}
                            <th scope="col" className="px-6 py-3 font-medium">Presión Atmosférica</th>
                            {/* <th scope="col" className="px-6 py-3 font-medium">Salinidad</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-3">No hay datos disponibles, intente con otra fecha.
                                </td>
                            </tr>
                        )}
                        {currentRows.map((item, index) => (
                            <tr className="text-center" key={index}>
                                <td className="px-6 py-3">{item.fecha}</td>
                                <td className="px-6 py-3">{item.hora}</td>
                                <td className="px-6 py-3">{item.temperatura.toFixed(1)} °C</td>
                                <td className="px-6 py-3">{item.velocidadViento.toFixed(1)} m/s </td>
                                <td className="px-6 py-3">{item.humedad.toFixed(1)}%</td>
                                {/* <td className="px-6 py-3">{item.radiacionUV.toFixed(1)}</td> */}
                                <td className="px-6 py-3">{item.presionAtmosferica.toFixed(1)} hPa
                                </td>
                                {/* <td className="px-6 py-3">{item.salinidad.toFixed(1)}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(data.length / rowsPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? 'bg-[#23415b] text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ListaDatos;
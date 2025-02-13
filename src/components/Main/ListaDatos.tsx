import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { handleData } from "../../utils/DataUtils";
import { DataItem } from "../../types/DataItem";
import { handleRangeData } from "../../utils/DataRange";

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

    useEffect(() => {
        handleData(setData);
    }, []);

    const downloadCSV = () => {
        const headers = ["Fecha", "Hora", "Temperatura", "Velocidad Viento", "Humedad", "Presión Atmosférica"];
        const rows = data.map(item => [
            item.fecha,
            item.hora,
            item.temperatura.toFixed(1),
            item.velocidadViento.toFixed(1),
            item.humedad.toFixed(1),
            item.presionAtmosferica.toFixed(1),
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
                <button onClick={() => handleRangeData(startDate, endDate, setShowError, setError, setLoading, setData)} className="md:ml-4 md:w-32 px-4 py-2 font-semibold bg-[#23415b] text-white rounded">
                    {loading ? "Cargando..." : "Buscar"}
                </button>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className=" bg-slate-100 border-[1px] border-slate-300">
                            <tr>
                                <th className="px-6 py-3">Fecha</th>
                                <th className="px-6 py-3">Hora</th>
                                <th className="px-6 py-3">Temperatura</th>
                                <th className="px-6 py-3">Velocidad del Viento</th>
                                <th className="px-6 py-3">Humedad</th>
                                <th className="px-6 py-3">Presión Atmosférica</th>
                            </tr>
                        </thead>
                        <tbody className=" border-[1px] border-slate-300">
                            {loading ? (
                                Array.from({ length: rowsPerPage }).map((_, index) => (
                                    <tr key={index} className="h-16 text-center border-b-[1px] border-slate-300">
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-slate-200 rounded"></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-slate-200 rounded"></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-slate-200 rounded"></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-slate-200 rounded"></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-slate-200 rounded"></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-slate-200 rounded"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : data.length === 0 ? (
                                <tr className=" h-96">
                                    <td rowSpan={6} colSpan={6} className="text-center py-3 font-semibold">
                                        No hay datos disponibles, intente con otra fecha.
                                    </td>
                                </tr>
                            ) : (
                                currentRows.map((item, index) => (
                                    <tr className="text-center border-[1px] border-slate-300 h-16" key={index}>
                                        <td className="px-6 py-3">{item.fecha}</td>
                                        <td className="px-6 py-3">{item.hora}</td>
                                        <td className="px-6 py-3">{item.temperatura.toFixed(1)} °C</td>
                                        <td className="px-6 py-3">{item.velocidadViento.toFixed(1)} m/s</td>
                                        <td className="px-6 py-3">{item.humedad.toFixed(1)}%</td>
                                        <td className="px-6 py-3">{item.presionAtmosferica.toFixed(1)} hPa</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
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
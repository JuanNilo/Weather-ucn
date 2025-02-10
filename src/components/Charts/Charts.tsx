import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { handleData } from '../../utils/DataUtils';
import { handleRangeData } from '../../utils/DataRange';
import { DataItem } from '../../types/DataItem';
import { FaTimesCircle } from 'react-icons/fa';

// Registra las escalas necesarias
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = () => {
    const [dataConditions, setDataConditions] = useState<any[]>([]);
    const [category, setCategory] = useState<string>('temperatura');
    const [chartData, setChartData] = useState<DataItem[]>([]);

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");


    // Mensaje de error
    const [error, setError] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    // Mensaje de cargando
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        handleData(setDataConditions);
    }, []);


    const fetchRangeData = () => {
        handleRangeData(
            startDate,
            endDate,
            setShowError,
            setError,
            setLoading,
            setDataConditions
        );
    }
    useEffect(() => {
        console.log("data en rango de fechas", dataConditions);
        if (dataConditions.length > 0) {
            const reversedDataConditions = [...dataConditions].reverse();
            let chartData: DataItem[] = [];

            switch (category) {
                case 'temperatura':
                    chartData = reversedDataConditions.map((item: any) => item.temperatura);
                    console.log("ChartTemeperature", chartData);
                    break;
                case 'viento':
                    chartData = reversedDataConditions.map((item: any) => item.velocidadViento);
                    break;
                case 'humedad':
                    chartData = reversedDataConditions.map((item: any) => item.humedad);
                    break;
                case 'presión':
                    chartData = reversedDataConditions.map((item: any) => item.presionAtmosferica);
                    break;
                default:
                    break;
            }

            setChartData(chartData);
        }
    }, [dataConditions, category]);

    const data = {
        labels: dataConditions.map((item: any) => item.hora).reverse(), // Etiquetas para el eje X
        datasets: [
            {
                label: category,
                data: chartData, // Datos para el eje Y
                fill: true,
                borderColor: 'rgb(164, 82, 72)',
                tension: 0.3,
                pointHoverBackgroundColor: 'rgba(164, 82, 72, 0.8)', // Color de fondo del punto al pasar el mouse
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Gráfico de ${category}`,
            },
        },
    };


    return (
        <div>
            <h2 className="text-3xl text-[#A45248] font-bold">Gráfico de {category}</h2>
            <div className="flex justify-center space-x-4 my-4">
                <button onClick={() => setCategory("temperatura")} className={`${category === "temperatura" ? "bg-[#A45248] text-white font-semibold" : "bg-gray-200 text-black"}  px-4 py-2 rounded`}>Temperatura</button>
                <button onClick={() => setCategory("humedad")} className={`${category === "humedad" ? "bg-[#A45248] text-white font-semibold" : "bg-gray-200 text-black"}  px-4 py-2 rounded`}>Humedad</button>
                <button onClick={() => setCategory("presión")} className={`${category === "presión" ? "bg-[#A45248] text-white font-semibold" : "bg-gray-200 text-black"}  px-4 py-2 rounded`}>Presión</button>
                <button onClick={() => setCategory("viento")} className={`${category === "viento" ? "bg-[#A45248] text-white font-semibold" : "bg-gray-200 text-black"}  px-4 py-2 rounded`}>Viento</button>
            </div>
            {/* Cuadro de error */}
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
            {/* Rango de fechas */}
            <div className="mb-4 grid grid-cols-1 md:flex gap-y-2  items-center justify-between">
                <label className="mr-2">Desde:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-slate-100 border-[1px] border-gray-300 p-2 rounded-md" />
                <label className="mr-2">Hasta:</label>
                <input type="date" className="bg-slate-100 border-[1px] border-gray-300 p-2 rounded-md" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={() => fetchRangeData()} className="md:ml-4 md:w-32 px-4 py-2 font-semibold bg-[#23415b] text-white rounded">
                    {loading ? "Cargando..." : "Buscar"}
                </button>
            </div>
            <div className='h-[70vh]'>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Charts;
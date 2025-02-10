import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { handleData } from '../../utils/DataUtils';

// Registra las escalas necesarias
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = () => {
    const [dataConditions, setDataConditions] = useState<any[]>([]);
    const [category, setCategory] = useState<string>('temperatura');
    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
        handleData(setDataConditions);
    }, []);

    useEffect(() => {
        if (dataConditions.length > 0) {
            const reversedDataConditions = [...dataConditions].reverse();
            let chartData: number[] = [];

            switch (category) {
                case 'temperatura':
                    chartData = reversedDataConditions.map((item: any) => item.temperatura);
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
            <div className='h-[70vh]'>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Charts;
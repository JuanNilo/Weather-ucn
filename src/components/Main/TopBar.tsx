import { useEffect, useState } from 'react'
import axios from 'axios';

function TopBar() {

    const [temperature, setTemperature] = useState(15);
    const [uvRadaition, setUvRadaition] = useState(12);
    const handleConditions = () => {
        fetch('http://api.weatherapi.com/v1/current.json?key=485dd0ceac38418db2b183840250302&q=Coquimbo&aqi=no')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUvRadaition(data.current.uv);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const fetchConditions = async () => {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0); // Ajustar la hora a 00:00:00.000Z
        const todayISOString = today.toISOString(); // Obtener la fecha de hoy en formato YYYY-MM-DDTHH:mm:ss.sssZ
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/${todayISOString}`);

        // Ordenar los datos por la fecha y la hora
        const sortedData = response.data.sort((a: any, b: any) => {
            const dateA = new Date(`${a.fecha}T${a.hora}:00.000Z`);
            const dateB = new Date(`${b.fecha}T${b.hora}:00.000Z`);
            return dateA.getTime() - dateB.getTime();
        });

        console.log("data sorted ✅", sortedData);
        const latestData = sortedData[sortedData.length - 2];

        setTemperature(latestData.temperatura.toFixed(1));
    }

    useEffect(() => {
        fetchConditions();
        handleConditions();
    }, []);

    return (
        <div className=' h-[10vh] grid grid-cols-2  text-justify md:hidden justify-between bg-[#A45248] p-2'>
            <p className='text-2xl text-justify font-bold text-white'>Temperatura:</p>
            <p className='text-2xl font-bold text-white'>{temperature}°C</p>
            <p className='text-2xl text-justify font-bold text-white'>Indice UV:</p>
            <p className='text-2xl font-bold text-white'>{uvRadaition}</p>

        </div>
    )
}

export default TopBar
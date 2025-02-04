
import { useEffect, useState } from 'react'
import axios from 'axios';

function SideBarConditions() {
    const [temperature, setTemperature] = useState(15);
    const [uvRadaition, setUvRadaition] = useState(12);
    const [uvBackground, setUvBackground] = useState('bg-purple-800');

    const scaleBackground = (uvRadaition: number) => {
        if (uvRadaition < 3) {
            setUvBackground('bg-green-600');
        } else if (uvRadaition < 6) {
            setUvBackground('bg-yellow-800');
        } else if (uvRadaition < 8) {
            setUvBackground('bg-orange-800');
        } else if (uvRadaition < 11) {
            setUvBackground('bg-red-800');
        } else {
            setUvBackground('bg-purple-800');
        }
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
    useEffect(() => {
        console.log('fetching Temperatura y Radiacion UV');
        handleConditions();
        fetchConditions();
        console.log('fetching Temperatura', temperature);
    }, []);

    useEffect(() => {
        scaleBackground(uvRadaition);
    }, [uvRadaition]);

    return (
        <main className='block'>
            <header className=' h-24'>

                <p className="text-xl text-white font-bold">UCN Campus Guayacán, Coquimbo</p>
            </header>
            <section className=" flex flex-col  items-center min-h-[50vh] gap-y-5 ">
                <div className="flex flex-col justify-center items-center text-center gap-y-10">
                    {/* Radaicion UV */}
                    <div className={` ${uvBackground} w-full h-40 rounded-lg border-2 border-white flex   pt-4 flex-col justify-center`}>
                        <p className="text-white text-2xl font-semibold">Indice UV</p>
                        <p className="text-[4rem] font-semibold text-white">{uvRadaition}</p>
                    </div>
                    {/* temperatura */}
                    <div className="flex flex-col">
                        <p className="text-white text-2xl font-semibold">Temperatura Actual</p>
                        <p className="text-[4rem] font-semibold text-white">{temperature} °C</p>
                    </div>
                </div>
                {/* Camara Submarina */}
                <div className='flex flex-col justify-center items-center gap-y-4 w-[100%]'>
                    <p className="text-white text-2xl font-semibold">Camara Submarina</p>
                    <div className="w-full h-40 bg-gray-800 rounded-lg border-2 border-white flex justify-center items-center relative overflow-hidden">
                        <p className="text-white font-bold text-3xl    relative z-10">Proximamente</p>
                    </div>
                </div>
            </section>
        </main>
    )

}

export default SideBarConditions
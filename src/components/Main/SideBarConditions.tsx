
import { useEffect, useState } from 'react'
function SideBarConditions() {
    const [temperature, setTemperature] = useState(15);
    const [uvRadaition, setUvRadaition] = useState(12);
    const [uvBackground, setUvBackground] = useState('bg-purple-800');

    const scaleBackground = (uvRadaition: number) => {
        if (uvRadaition < 3) {
            setUvBackground('bg-green-800');
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

    const handleConditions = () => {
        fetch('http://api.weatherapi.com/v1/current.json?key=485dd0ceac38418db2b183840250302&q=Coquimbo&aqi=no')
            .then(response => response.json())
            .then(data => {
                setTemperature(data.current.temp_c);
                setUvRadaition(data.current.uv);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    useEffect(() => {
        handleConditions();
    }, []);

    useEffect(() => {
        scaleBackground(uvRadaition);
    }, [uvRadaition]);

    return (
        <>
            <p className="text-xl text-white font-bold">UCN Campus Guayacán, Coquimbo</p>
            <div className=" flex justify-center items-center h-[40%]">

                <div className="flex flex-col justify-center items-center text-center gap-y-10">
                    {/* Radaicion UV */}
                    <div className={` ${uvBackground} w-full h-40 rounded-lg border-2 border-white flex   pt-4 flex-col justify-center`}>
                        <p className="text-white text-2xl font-semibold">Indice UV</p>
                        <p className="text-[4rem] font-semibold text-white">{uvRadaition}</p>
                    </div>
                    {/* temperatura */}
                    <div className="flex flex-col">
                        <p className="text-white text-2xl font-semibold">Temperatura Actual</p>
                        <p className="text-[5rem] font-semibold text-white">{temperature} °C</p>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-white text-2xl font-semibold">Camara Submarina</p>
                <div className="w-full h-40 bg-gray-800 rounded-lg border-2 border-white flex justify-center items-center relative overflow-hidden">
                    {/* <img src="public/fondo-marino.png" alt="Proximamente" className="w-full  blur-sm hidden md:block absolute inset-0" /> */}
                    <p className="text-white font-bold text-3xl    relative z-10">Proximamente</p>
                </div>
            </div>
        </>
    )

}

export default SideBarConditions
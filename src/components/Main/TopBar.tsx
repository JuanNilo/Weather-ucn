import { useEffect, useState } from 'react'

function TopBar() {

    const [temperature, setTemperature] = useState(15);
    const [uvRadaition, setUvRadaition] = useState(12);
    const handleConditions = () => {
        fetch('http://api.weatherapi.com/v1/current.json?key=485dd0ceac38418db2b183840250302&q=Coquimbo&aqi=no')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTemperature(data.current.temp_c);
                setUvRadaition(data.current.uv);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    useEffect(() => {
        console.log('fetching Temperatura y Radiacion UV');
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
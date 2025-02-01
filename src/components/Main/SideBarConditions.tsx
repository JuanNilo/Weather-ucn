
import { useEffect, useState } from 'react'
function SideBarConditions() {
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

    useEffect(() => {
        scaleBackground(uvRadaition);
        setUvRadaition(12);
    }, [uvRadaition]);

    return (
        <>
            <p className="text-xl text-white font-bold">UCN Campus Guayacán, Coquimbo</p>
            <div className=" flex justify-center items-center h-[40%]">

                <div className="flex flex-col justify-center items-center text-center gap-y-10">
                    {/* Radaicion UV */}
                    <div className={` ${uvBackground} w-full h-40 rounded-lg border-2 border-white flex   pt-4 flex-col justify-center`}>
                        <p className="text-white text-2xl font-semibold">Indice UV</p>
                        <p className="text-[5rem] font-semibold text-white">{uvRadaition}</p>
                    </div>
                    {/* temperatura */}
                    <div className="flex flex-col">
                        <p className="text-white text-2xl font-semibold">Temperatura Actual</p>
                        <p className="text-[5rem] font-semibold text-white">15°</p>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-white text-2xl font-semibold">Camara Submarina</p>
                <iframe
                    src="https://ucncamcq.ucn.cl:8181/f537af01-e143-49b9-901a-6e6b67be9073.html"
                    frameBorder={0}
                    allowFullScreen
                    className="w-full h-[30vh] pointer-events-none"
                ></iframe>
            </div>
        </>
    )

}

export default SideBarConditions
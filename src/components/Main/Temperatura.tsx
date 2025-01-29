import { WiCloudy } from "react-icons/wi"

function Temperatura() {
    return (
        <>
            <p className="text-xl text-white font-bold">UCN Campus Guayacán, Coquimbo</p>
            <div className=" flex justify-center items-center h-[80%]">

                <div className="flex flex-col justify-center items-center">
                    <div>
                        <p className="text-[5rem] font-semibold text-white">15°</p>
                    </div>
                    <div>
                        <p className=" text-lg  font-semibold text-white">Parcialmente nublado</p>
                    </div>
                    <div>
                        <WiCloudy size={200} className="text-white" />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Temperatura
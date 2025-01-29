import { FaWind, FaSun, FaCloudRain } from "react-icons/fa"
import { FaDroplet } from "react-icons/fa6"
import CardCondiciones from "./Card-Condiciones"
import ListaDatos from "./ListaDatos"
function Condiciones() {
    return (
        <div className=" h-[60%] ">

            <div className="min-h-[50vh] p-4">

                {/* <aside className="flex flex-col space-y-4 w-[50%] p-2 h-[90%] ">
                    <CardCondiciones logo={<FaWind />} propiedad="Viento" valor="5 km/h" />
                    <CardCondiciones logo={<FaDroplet />} propiedad="Humedad" valor="88%" />
                    <CardCondiciones logo={<FaSun />} propiedad="Índice UV" valor="Extremo (12)" />
                    <CardCondiciones logo={<FaCloudRain />} propiedad="Precipitaciones" valor="0%" />
                    <CardCondiciones logo={<FaDroplet />} propiedad="Punto de rocío" valor="13°" />
                </aside> */}
                <ListaDatos />

            </div>
        </div>
    )

}

export default Condiciones
// 
import Charts from "../Charts/Charts"
import ListaDatos from "./ListaDatos"
function Condiciones() {
    return (
        <div className=" h-[60%] ">

            <div className="min-h-[50vh] p-4">

                <ListaDatos />
                <Charts />
            </div>
        </div>
    )

}

export default Condiciones
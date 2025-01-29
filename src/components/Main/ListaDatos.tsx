

function ListaDatos() {
    return (


        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 border-[1px] border-gray-300  shadow-lg">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100 border-[1px] border-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Hora
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Viento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Temperatura
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Indice UV
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Humedad
                        </ th>
                        <th scope="col" className="px-6 py-3">
                            Presión atmosférica
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Salinidad
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            28-01-2025
                        </th>
                        <td className="px-6 py-4">
                            14:00
                        </td>
                        <td className="px-6 py-4">
                            4 m/s
                        </td>
                        <td className="px-6 py-4">
                            16.3 °C
                        </td>
                        <td className="px-6 py-4">
                            12
                        </td>
                        <td className="px-6 py-4">
                            80.3%
                        </td>
                        <td className="px-6 py-4">
                            424 hPa
                        </td>
                        <td className="px-6 py-4">
                            35.6 ppt
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

    )
}

export default ListaDatos;
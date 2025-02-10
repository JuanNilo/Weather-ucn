import axios from 'axios';

/**
 * Obtiene datos de la API para la fecha actual en la zona horaria UTC-3 (Chile),
 * formatea la fecha, ordena los datos y establece los datos formateados utilizando la función proporcionada.
 *
 * @param setData - Una función para establecer los datos formateados.
 */
export const handleData = async (setData: (data: any) => void) => {
    // Obtener la fecha y hora actual en UTC-3 (Chile)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Ajustar la hora a 00:00:00.000Z en UTC-3 (Chile)
    const todayISOString = today.toISOString(); // Obtener la fecha de hoy en formato YYYY-MM-DDTHH:mm:ss.sssZ

    // Realizar una solicitud GET a la API para obtener los datos del día actual
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/${todayISOString}`);

    // Formatear los datos recibidos
    const formattedData = response.data.map((item: any) => {
        const date = new Date(item.fecha);
        const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCFullYear()}`;
        return {
            ...item,
            fecha: formattedDate
        };
    }).sort((a: any, b: any) => {
        // Ordenar los datos por fecha y hora en orden descendente
        const dateA = new Date(`${a.fecha.split('-').reverse().join('-')}T${a.hora}`);
        const dateB = new Date(`${b.fecha.split('-').reverse().join('-')}T${b.hora}`);
        return dateB.getTime() - dateA.getTime();
    });

    // Establecer los datos formateados utilizando la función setData proporcionada
    setData(formattedData);
}
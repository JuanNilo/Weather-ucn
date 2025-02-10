import axios from 'axios';
import { DataItem } from '../types/DataItem';

/**
 * Obtiene datos de la API para un rango de fechas en la zona horaria UTC-3 (Chile),
 * formatea las fechas, ordena los datos y establece los datos formateados utilizando las funciones proporcionadas.
 *
 * @param startDate - La fecha de inicio del rango en formato YYYY-MM-DD.
 * @param endDate - La fecha de término del rango en formato YYYY-MM-DD.
 * @param setShowError - Una función para mostrar u ocultar mensajes de error.
 * @param setError - Una función para establecer el mensaje de error.
 * @param setLoading - Una función para establecer el estado de carga.
 * @param setData - Una función para establecer los datos formateados.
 */
export const handleRangeData = async (
    startDate: string,
    endDate: string,
    setShowError: (show: boolean) => void,
    setError: (error: string) => void,
    setLoading: (loading: boolean) => void,
    setData: (data: DataItem[]) => void
) => {
    setShowError(false);
    setError("");

    // Validar que se hayan seleccionado fechas
    if (startDate === "" || endDate === "") {
        setError("Debe seleccionar una fecha de inicio y una fecha de término.");
        setShowError(true);
        return;
    }

    // Validar que la fecha de inicio no sea mayor a la fecha de término
    if (startDate > endDate) {
        setError("La fecha de inicio no puede ser mayor a la fecha de término.");
        setShowError(true);
        return;
    }
    setLoading(true);

    // tiempo de espera 5 segundos
    setTimeout(() => {
        setLoading(false);
    }, 10000);

    // Formatear la fecha de inicio a UTC-3 (Chile)
    const formattedStartDate = new Date(startDate);
    formattedStartDate.setUTCHours(formattedStartDate.getUTCHours() - 3, 0, 0, 0);
    const formattedStartDateISOString = formattedStartDate.toISOString();

    // Formatear la fecha de término a UTC-3 (Chile)
    const formattedEndDate = new Date(endDate);
    formattedEndDate.setUTCHours(0, 0, 0);
    const formattedEndDateISOString = formattedEndDate.toISOString();

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/${formattedStartDateISOString}/${formattedEndDateISOString}`);
    const formattedData = response.data.map((item: DataItem) => {
        const date = new Date(item.fecha);
        const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCFullYear()}`;
        return {
            ...item,
            fecha: formattedDate
        };
    }).sort((a: DataItem, b: DataItem) => {
        const dateA = new Date(`${a.fecha.split('-').reverse().join('-')}T${a.hora}`);
        const dateB = new Date(`${b.fecha.split('-').reverse().join('-')}T${b.hora}`);
        return dateB.getTime() - dateA.getTime();
    });

    setData(formattedData);
    setLoading(false);
};
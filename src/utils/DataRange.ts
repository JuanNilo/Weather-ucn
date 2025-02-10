// src/utils/dataHandlers.ts
import axios from 'axios';
import { DataItem } from '../types/DataItem';

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
    if (startDate === "" || endDate === "") {
        setError("Debe seleccionar una fecha de inicio y una fecha de término.");
        setShowError(true);
        return;
    }
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

    const formattedStartDate = new Date(startDate);
    formattedStartDate.setUTCHours(0, 0, 0, 0);
    const formattedStartDateISOString = formattedStartDate.toISOString();
    console.log('startDate', formattedStartDateISOString);

    const formattedEndDate = new Date(endDate);
    formattedEndDate.setUTCHours(0, 0, 0, 0);
    const formattedEndDateISOString = formattedEndDate.toISOString();
    console.log('endDate', formattedEndDateISOString);

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
    console.log("data", formattedData);
};
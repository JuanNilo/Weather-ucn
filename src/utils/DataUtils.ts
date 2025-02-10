import axios from 'axios';

export const handleData = async (setData: (data: any) => void) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Ajustar la hora a 00:00:00.000Z
    const todayISOString = today.toISOString(); // Obtener la fecha de hoy en formato YYYY-MM-DDTHH:mm:ss.sssZ
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/${todayISOString}`);
    const formattedData = response.data.map((item: any) => {
        const date = new Date(item.fecha);
        const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCFullYear()}`;
        return {
            ...item,
            fecha: formattedDate
        };
    }).sort((a: any, b: any) => {
        const dateA = new Date(`${a.fecha.split('-').reverse().join('-')}T${a.hora}`);
        const dateB = new Date(`${b.fecha.split('-').reverse().join('-')}T${b.hora}`);
        return dateB.getTime() - dateA.getTime();
    });
    setData(formattedData);
    console.log("data", formattedData);
}


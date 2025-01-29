interface CardCondicionesProps {
    propiedad: string;
    logo: any;
    valor: string;
}
function CardCondiciones({ logo, propiedad, valor }: CardCondicionesProps) {
    return (
        <div className="flex justify-between bg-slate-100 p-3 border-[1px] border-gray-300 rounded-lg">
            <span className="flex gap-2 items-center">
                <>{logo}</>
                <p>{propiedad}</p>
            </span>
            <span>{valor}</span>
        </div>
    )
}

export default CardCondiciones;
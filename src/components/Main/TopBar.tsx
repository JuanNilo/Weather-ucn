function TopBar() {
    // color azul #23415b
    return (
        <div className=' h-[10vh] block md:hidden justify-between items-center bg-[#A45248] p-2'>
            <p className='text-2xl font-bold text-white'>Temperatura: 18°C</p>
            <p className='text-2xl font-bold text-white'>Indice UV: 12</p>

        </div>
    )
}

export default TopBar
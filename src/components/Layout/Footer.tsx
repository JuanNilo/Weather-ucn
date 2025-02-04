
function Footer() {
    return (
        <footer className="bg-[#23415b] text-white h-24 md:h-20 flex flex-col md:justify-around text-sm px-20">
            <div className="flex text-center items-center  w-full md:w-[30%] ">
                <img src="/public/logoceaza.jpg" alt="Logo" className="h-full hidden md:block p-2" />
                <p>Datos provistos por CEAZA, obtenidos desde <a href="www.ceazamet.cl">www.ceazamet.cl</a></p>
            </div>
            <div className="w-full md:w-[40%] flex font-semibold flex-col justify-center items-center">
                <p>Departamento de Informática - UCN</p>
                <p>Coquimbo 2025</p>
            </div>
            <div className="w-[30%] hidden md:flex justify-end items-center ">
                <img src="/public/Banner.PNG" alt="Logo" className="h-full" />
            </div>
        </footer>
    );
}

export default Footer;
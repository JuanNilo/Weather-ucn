
function Footer() {
    return (
        <footer className="bg-[#23415b] text-white h-20 flex justify-around text-sm px-20">
            <div className="flex items-center  w-[30%] ">
                <img src="/public/logoceaza.jpg" alt="Logo" className="h-full hidden md:block p-2" />
                <p>Datos provistos por CEAZA, obtenidos desde <a href="www.ceazamet.cl">www.ceazamet.cl</a></p>
            </div>
            <div className="w-[40%] flex flex-col justify-center items-center">
                <p>Departamento de Informática - UCN</p>
                <p>Coquimbo 2025</p>
            </div>
            <div className="w-[30%] flex justify-end items-center ">
                <img src="/public/Banner.PNG" alt="Logo" className="h-full" />
            </div>
        </footer>
    );
}

export default Footer;
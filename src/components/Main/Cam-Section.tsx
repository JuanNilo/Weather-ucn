import CardVideo from "./Card-Video"

function Historico() {
    return (
        <div className=" min-h-[60vh] p-5 rounded-lg">
            <p className="text-3xl text-[#A45248] font-bold">Condiciones atmosfericas UCN - Coquimbo</p>
            <div className="grid grid-cols-3 gap-2 py-5">
                <CardVideo link="https://ucncamcq.ucn.cl:8181/f537af01-e143-49b9-901a-6e6b67be9073.html" />
                <CardVideo link="https://ucncamcq.ucn.cl:8181/62e76aea-0f11-4c9f-ac40-3bb6da9ff5dd.html" />
                <CardVideo link="https://ucncamcq.ucn.cl:8181/31334bb8-688e-4b31-9024-503a2e88a7b3.html" />
                <CardVideo link="https://ucncamcq.ucn.cl:8181/cb57419f-fb54-4a70-ada7-b567d45f75ad.html" />
                <CardVideo link="https://ucncamcq.ucn.cl:8181/3074b3e7-e634-482b-8d9a-014bc4b46433.html" />
            </div>
        </div>
    )

}

export default Historico
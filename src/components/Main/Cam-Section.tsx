import CardVideo from "./Card-Video"
import { useState } from "react"

function Historico() {

    const [bigVideo, setBigVideo] = useState('https://ucncamcq.ucn.cl:8181/62e76aea-0f11-4c9f-ac40-3bb6da9ff5dd.html')
    return (
        <div className=" min-h-[60vh] p-5 rounded-lg">
            <p className="text-3xl text-[#A45248] font-bold">Condiciones atmosféricas UCN - Coquimbo</p>
            <main className="flex">
                <aside className="w-[100%]">
                    <iframe
                        src={`${bigVideo}`}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className=" h-[60vh] w-full pointer-events-none"
                    ></iframe>
                </aside>
                <div className="w-[40%] m-4 flex flex-col items-center gap-2 py-5 overflow-scroll max-h-[55vh]">
                    <div className="w-full flex items-center justify-center" onClick={() => setBigVideo("https://ucncamcq.ucn.cl:8181/f537af01-e143-49b9-901a-6e6b67be9073.html")} >
                        <CardVideo link="https://ucncamcq.ucn.cl:8181/f537af01-e143-49b9-901a-6e6b67be9073.html" />
                    </div>
                    <div className="w-full flex items-center justify-center" onClick={() => setBigVideo("https://ucncamcq.ucn.cl:8181/62e76aea-0f11-4c9f-ac40-3bb6da9ff5dd.html")} >
                        <CardVideo link="https://ucncamcq.ucn.cl:8181/62e76aea-0f11-4c9f-ac40-3bb6da9ff5dd.html" />
                    </div>
                    <div className="w-full flex items-center justify-center" onClick={() => setBigVideo("https://ucncamcq.ucn.cl:8181/31334bb8-688e-4b31-9024-503a2e88a7b3.html")} >
                        <CardVideo link="https://ucncamcq.ucn.cl:8181/31334bb8-688e-4b31-9024-503a2e88a7b3.html" />
                    </div>
                    <div className="w-full flex items-center justify-center" onClick={() => setBigVideo("https://ucncamcq.ucn.cl:8181/cb57419f-fb54-4a70-ada7-b567d45f75ad.html")} >
                        <CardVideo link="https://ucncamcq.ucn.cl:8181/cb57419f-fb54-4a70-ada7-b567d45f75ad.html" />
                    </div>
                    <div className="w-full flex items-center justify-center" onClick={() => setBigVideo("https://ucncamcq.ucn.cl:8181/3074b3e7-e634-482b-8d9a-014bc4b46433.html")} >
                        <CardVideo link="https://ucncamcq.ucn.cl:8181/3074b3e7-e634-482b-8d9a-014bc4b46433.html" />
                    </div>

                </div>
            </main>
        </div>
    )

}

export default Historico
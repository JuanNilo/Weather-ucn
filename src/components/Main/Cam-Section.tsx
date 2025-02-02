import CardVideo from "./Card-Video"
import { useState } from "react"

function Historico() {
    const videos = [
        "https://ucncamcq.ucn.cl:8181/f537af01-e143-49b9-901a-6e6b67be9073.html",
        "https://ucncamcq.ucn.cl:8181/62e76aea-0f11-4c9f-ac40-3bb6da9ff5dd.html",
        "https://ucncamcq.ucn.cl:8181/31334bb8-688e-4b31-9024-503a2e88a7b3.html",
        "https://ucncamcq.ucn.cl:8181/cb57419f-fb54-4a70-ada7-b567d45f75ad.html",
        "https://ucncamcq.ucn.cl:8181/3074b3e7-e634-482b-8d9a-014bc4b46433.html",
        "https://ucncamcq.ucn.cl:8181/39eb3ca2-3e0c-49e8-a8b0-6b5e607be974.html"
    ]

    const [bigVideo, setBigVideo] = useState(videos[0])

    return (
        <div className="min-h-[35vh] md:min-h-[60vh] p-2 md:p-5 rounded-lg md:mb-5   ">
            <p className="text-3xl text-[#A45248] font-bold">Condiciones atmosféricas UCN - Coquimbo</p>
            <main className="flex">
                <aside className="hidden md:block w-[100%] max-h-[55vh] overflow-hidden rounded-lg">
                    <iframe
                        src={`${bigVideo}`}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="  h-[100%] w-[95vh] pointer-events-none rounded-lg "
                    ></iframe>
                </aside>
                <div className="w-[100%] md:w-[60%] mx-2 flex flex-col items-center gap-2 p overflow-scrol  overflow-x-hidden max-h-[35vh] md:max-h-[55vh]">
                    {
                        videos.map((video, index) => (
                            <div key={index} className=" w-[55vh] flex items-start justify-center" onClick={() => setBigVideo(video)} >
                                <CardVideo link={video} />
                            </div>
                        ))
                    }
                </div>
            </main>
        </div>
    )

}

export default Historico
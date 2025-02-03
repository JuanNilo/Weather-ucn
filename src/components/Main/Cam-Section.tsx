import CardVideo from "./Card-Video"
import { useState } from "react"
import videoData from "../../data/videos.json";

function Historico() {

    const [bigVideo, setBigVideo] = useState(videoData[0].url)

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
                        videoData.map((video, index) => (
                            <div key={index} className=" w-[55vh] flex items-start justify-center" onClick={() => setBigVideo(video.url)} >
                                <CardVideo link={video.url} />
                            </div>
                        ))
                    }
                </div>
            </main>
        </div>
    )

}

export default Historico
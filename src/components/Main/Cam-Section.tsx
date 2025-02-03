import CardVideo from "./Card-Video"
import videoData from "../../data/videos.json";

function Historico() {

    // const [bigVideo, setBigVideo] = useState(videoData[0].url)

    return (
        <div className="min-h-[35vh]  md:min-h-[30vh] p-2 md:p-5 rounded-lg md:mb-5   ">
            <main className="flex">
                {/* <aside className="hidden md:block w-[100%] max-h-[55vh] overflow-hidden rounded-lg">
                    <iframe
                    src={`${bigVideo}`}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="  h-[100%] w-[95vh] pointer-events-none rounded-lg "
                    ></iframe>
                    </aside> */}
                <div className="w-[100%] md:w-[100%] mx-2 flex flex items-center gap-2 p overflow-scrol  overflow-x-scroll max-h-[35vh] md:max-h-[55vh]">
                    {
                        videoData.map((video, index) => (
                            <div key={index} className=" w-full flex items-start justify-center"  >
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
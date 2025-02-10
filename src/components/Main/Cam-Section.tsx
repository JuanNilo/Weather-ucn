import CardVideo from "../Cards/Card-Video"
import videoData from "../../data/videos.json";

function Historico() {

    return (
        <div className="min-h-[35vh]  md:min-h-[30vh] p-2 md:p-5 rounded-lg md:mb-5   ">
            <main className="flex">
                <div className="w-[100%] md:w-[100%] mx-2 flex items-center gap-2 p overflow-scrol  overflow-x-scroll max-h-[35vh] md:max-h-[55vh]">
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
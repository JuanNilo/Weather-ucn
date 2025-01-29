interface CardVideoProps {
    link: string;
}
function CardVideo({ link }: CardVideoProps) {

    const handleIframeClick = () => {
        const iframe = document.querySelector("iframe");
        if (iframe) {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            }
        }
    }
    return (
        <div className="bg-slate-100 w-[80%] shadow-md border-[1px] border-gray-300 text-black rounded-lg">
            <div
                onClick={() => handleIframeClick()}

                className="w-full h-full cursor-pointer relative transform hover:scale-200 hover:z-50 transition-transform duration-500 ease-in-out"
            >
                <iframe
                    src={`${link}?autoplay=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full pointer-events-none"
                ></iframe>
            </div>
        </div>
    );
}


export default CardVideo;
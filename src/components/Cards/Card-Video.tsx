interface CardVideoProps {
    link: string;
}

function CardVideo({ link }: CardVideoProps) {
    return (
        <div className="bg-slate-100 w-[100%] shadow-md border-[1px] border-gray-300 text-black rounded-lg overflow-hidden">
            <div className="w-[45vh] h-[25vh] relative hover:cursor-pointer">
                <iframe
                    src={`${link}?autoplay=1&controls=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full  absolute top-0 left-0"
                ></iframe>
            </div>
        </div>
    );
}

export default CardVideo;
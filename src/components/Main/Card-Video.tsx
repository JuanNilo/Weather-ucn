interface CardVideoProps {
    link: string;
}
function CardVideo({ link }: CardVideoProps) {

    return (
        <div className="bg-slate-100 w-[80%] shadow-md border-[1px] border-gray-300 text-black rounded-lg overflow-hidden">
            <div className="w-full h-0 pb-[56.25%] relative overflow-hidden hover:cursor-pointer ">
                <iframe
                    src={`${link}?autoplay=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full pointer-events-none absolute top-0 left-0 "
                ></iframe>
            </div>
        </div>
    );
}


export default CardVideo;
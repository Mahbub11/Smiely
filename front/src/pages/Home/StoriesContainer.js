import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { stories } from "../../utils/constants";

const StoriesContainer = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7.5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <>
            <Slider {...settings} className="w-full bg-white dark:bg-gray-500 pt-2.5 pb-1 px-2.5 flex overflow-hidden shadow-sm rounded">

                {stories.map((s, i) => (
                    <div className="flex flex-col text-center justify-center items-center p-2 cursor-pointer" key={i}>
                        <div className="w-16 p-[1px] h-16 rounded-full border-2 border-green-500">
                            <img loading="lazy" className="rounded-full h-full w-full border border-gray-300 object-cover" src='https://images.pexels.com/photos/1459497/pexels-photo-1459497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' draggable="false" alt="story" />
                        </div>
                        <span className="text-xs dark:text-white text-center mr-6">{s.title}</span>
                    </div>
                ))}

            </Slider>
        </>

    )
}

export default StoriesContainer
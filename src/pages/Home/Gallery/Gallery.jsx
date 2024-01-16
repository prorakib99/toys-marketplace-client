import Slider from 'react-slick';
import GalleryItems from './GalleryItems/GalleryItems';

// Slider Settings
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const Gallery = () => {
    return (
        <div className='container mx-auto px-5 py-10'>
            <Slider {...settings}>
                <GalleryItems />
                <GalleryItems />
                <GalleryItems />
                <GalleryItems />
                <GalleryItems />
                <GalleryItems />
            </Slider>
        </div>
    );
};

export default Gallery;

import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HomeSlider = () => {
    const sliderData = [
        { id: 1, img: "https://i.ibb.co.com/zVVB6yx0/simage1.jpg", title: "Unleash Imagination", subTitle: "Discover the world's best educational toys." },
        { id: 2, img: "https://i.ibb.co.com/sM4xz24/simage2.jpg", title: "Support Local Sellers", subTitle: "Handpicked quality toys from local shops." },
        { id: 3, img: "https://i.ibb.co.com/3YMxDdPg/simage3.jpg", title: "New Arrivals Daily", subTitle: "The freshest collection for every age group." },
    ];

    return (
        <div className="w-11/12 mx-auto mt-6 rounded-xl overflow-hidden">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-[50vh] lg:h-[70vh]"
            >
                {sliderData.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div 
                            className="h-full w-full bg-cover bg-center flex items-center justify-start p-10 md:p-20" 
                            style={{ backgroundImage: `url(${slide.img})`, filter: 'brightness(100%)' }}
                        >
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className='relative text-white max-w-lg'>
                                <p className='text-md md:text-xl font-bold mb-2'>{slide.subTitle}</p>
                                <h1 className="text-4xl md:text-6xl font-extrabold">{slide.title}</h1>
                                <Link to="/all-toys"><button className="btn btn-secondary mt-5">Browse Collection</button></Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeSlider;
import toy2 from '../../../assets/Hero-section-img/khalna.png';
import toy1 from '../../../assets/Hero-section-img/birite.png';
import toys from '../../../assets/Hero-section-img/hero-img.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className='container px-5 mx-auto py-16 grid md:grid-cols-2 items-center gap-16'>
            <div className=''>
                <div className='relative origin-top-left -skew-x-3 border-pink-600 border-2 border-dashed rounded-lg rotate-0 md:rotate-[-8.72deg]'>
                    <img className='absolute md:left-0 -z-10 w-16 sm:w-auto' src={toy1} alt='' />
                    <h1 className="text-pink-600 z-20 text-center text-[40px] sm:text-[64px] font-bold font-['Nunito'] leading-normal">
                        Fun to care,
                    </h1>
                    <img
                        className='absolute top-0 right-0 -z-10 w-16 sm:w-auto'
                        src={toy2}
                        alt=''
                    />
                </div>
                <h1 className="text-amber-400 md:-mt-6 text-[40px] sm:text-[64px] text-center font-black font-['Nunito'] leading-normal">
                    Comfy Feel
                </h1>
                <p className="text-neutral-400 text-xl font-medium font-['Nunito'] leading-normal mb-6">
                    Mauris aliquet enim quis odio lacinia, id <br /> viverra elit convallis. Nunc
                    nulla massa elit
                </p>
                <div className='text-center md:text-start'>
                    <Link
                        to='/all-toys'
                        className="px-5 md:px-7 py-2 md:py-4 bg-pink-600 rounded-lg shadow justify-center items-center gap-3 inline-flex text-white text-lg font-bold font-['Inter'] leading-7"
                    >
                        SHOP NOW
                    </Link>
                </div>
            </div>
            <div>
                <img className='drop-shadow-2xl w-full' src={toys} alt='' />
            </div>
        </div>
    );
};

export default Hero;

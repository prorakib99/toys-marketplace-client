import footerBg from '../../../assets/footer-img/Footer-Bg.png';
import footerImg from '../../../assets/footer-img/footer-logo-img.png';
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            className='bg-cover bg-no-repeat relative before:absolute before:w-full before:h-full before:from-pink-100 before:bg-gradient-to-r before:bg-opacity-50 before:z-10'
            style={{ backgroundImage: `url('${footerBg}')` }}
        >
            <div className='container mx-auto px-5'>
                <div className='py-10 justify-between gap-10 flex z-20 relative flex-wrap md:flex-nowrap items-start '>
                    <div>
                        <img src={footerImg} alt='' />
                    </div>
                    <div>
                        <h4 className='font-medium text-lg mb-3'>Contact Details</h4>
                        <p className='text-lg font'>
                            <span>Email: </span>
                            <a href='mailto:example@gmail.com'>example@gmail.com</a>
                        </p>
                        <p className="text-lg font-['Inter']">
                            <span>Phone: </span>
                            <a href='tel:+8801000000000'>+8801000000000</a>
                        </p>
                    </div>
                    <div>
                        <h4 className='font-medium text-lg mb-3'>Social Media</h4>
                        <ul className='flex flex-wrap gap-3'>
                            <li>
                                <Link>
                                    <FaFacebook className='text-blue-600 text-2xl' />
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <FaYoutube className='text-red-500 text-2xl' />
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <FaInstagram className='text-red-500 text-2xl' />
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <FaLinkedin className='text-blue-600 text-2xl' />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="text-gray-800 relative z-20 pb-5 text-center text-lg font-normal font-['Inter'] leading-normal">
                    © 2024{' '}
                    <a
                        className='text-pink-600'
                        target='_blank'
                        href='https://github.com/prorakib99/'
                    >
                        Rakiul Islam
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

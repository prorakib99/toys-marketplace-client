import products_bg from '../../../assets/Product-Section/Product-bg.png';
import Slider from 'react-slick/lib/slider';
import ProductsCard from '../ProductsCard/ProductsCard';
import React, { useEffect, useState } from 'react';
import Loader from '../../Shared/Loader/Loader';
import {
    Button,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Textarea,
    useToast,
    useDisclosure
} from '@chakra-ui/react';
import AddToyModal from '../../Shared/AddToyModal/AddToyModal';

// Slider Config
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    pauseOnHover: true,
    appendDots: (dots) => (
        <div
            style={{
                bottom: '-60px',
                padding: '10px'
            }}
        >
            <ul style={{ margin: '5px' }}> {dots} </ul>
        </div>
    ),

    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
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

const CategoryProducts = () => {
    const [toys, setToys] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isToysLoading, setIsToysLoading] = useState(false);

    const handleCategoryProducts = (categoryID) => {
        setIsToysLoading(true);
        fetch(`http://localhost:5000/categories/${categoryID}`)
            .then((res) => res.json())
            .then((data) => {
                setToys(data);
                setIsToysLoading(false);
            });
    };

    useEffect(() => {
        setIsLoading(true);

        fetch(`http://localhost:5000/categories`)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setIsLoading(false);
            });

        fetch(`http://localhost:5000/categories/1`)
            .then((res) => res.json())
            .then((data) => {
                setToys(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='bg-cover bg-no-repeat' style={{ backgroundImage: `url('${products_bg}')` }}>
            <div className='container mx-auto px-5 py-7'>
                <div className='text-center'>
                    <h4 className="text-pink-600 text-base font-semibold font-['Inter'] leading-normal">
                        Trending Products
                    </h4>
                    <h2 className="text-gray-900 text-4xl font-bold font-['Nunito'] leading-[44px] mt-[12px] mb-[20px]">
                        Popular Product
                    </h2>
                    <p className="text-gray-500 text-lg font-normal font-['Inter'] leading-7">
                        Simple, transparent pricing that grows with you. Try any plan free for 30
                        days.
                    </p>
                </div>
                <div className='py-5'>
                    <Tabs variant='soft-rounded'>
                        <TabList className='flex flex-wrap items-center !justify-center gap-5'>
                            {categories.map((category) => (
                                <>
                                    <Tab
                                        key={category.categoryID}
                                        onClick={() => handleCategoryProducts(category.categoryID)}
                                        _selected={{ color: 'white', bg: 'pink.500' }}
                                    >
                                        {category.category}
                                    </Tab>
                                </>
                            ))}
                        </TabList>

                        <AddToyModal></AddToyModal>

                        {isToysLoading ? (
                            <Loader></Loader>
                        ) : (
                            <>
                                <TabPanels className='py-8'>
                                    {categories.map((category) => (
                                        <>
                                            <TabPanel key={category._id}>
                                                <Slider {...settings}>
                                                    {toys.map((toy) => (
                                                        <ProductsCard
                                                            key={toy._id}
                                                            toy={toy}
                                                        ></ProductsCard>
                                                    ))}
                                                </Slider>
                                            </TabPanel>
                                        </>
                                    ))}
                                </TabPanels>
                            </>
                        )}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default CategoryProducts;

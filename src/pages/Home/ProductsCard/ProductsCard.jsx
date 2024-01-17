import card from '../../../assets/Card/card.png';

const ProductsCard = ({ toy, shopPage }) => {
    const { _id, name, price, categoryID, category, description, ratings, picture } = toy;
    return (
        <div
            className={`bg-white rounded-lg border flex flex-col ${
                shopPage || 'mx-4'
            } border-stone-300`}
        >
            <div className='px-8 flex-1 flex items-center justify-center py-4'>
                <img className='w-full' src={picture || card} alt='' />
            </div>
            <footer className='bg-[#FAF5F9] w-full rounded-lg border border-stone-300 py-[15px] px-[30px] flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <div>
                        <h2 className="text-black text-lg font-medium font-['Inter'] leading-tight">
                            {name}
                        </h2>
                        {shopPage && <span>rating</span>}
                    </div>
                    {shopPage && (
                        <h2 className="text-black text-sm font-normal font-['Inter'] leading-tight">
                            Stock(12)
                        </h2>
                    )}
                </div>
                <div className='flex items-center justify-between'>
                    <h4 className="text-pink-600 text-xl font-bold font-['Inter'] leading-tight">
                        ${price}
                    </h4>

                    <button className="bg-pink-600 text-white text-base font-medium font-['Inter'] leading-normal rounded-md px-3 lg:px-5 py-2">
                        Details
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ProductsCard;

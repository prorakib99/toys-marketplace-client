import { CiSearch } from 'react-icons/ci';
import { Navigate, useNavigate } from 'react-router-dom';

const SearchBar = ({ handleSearch, searchTerm, setSearchTerm, homePage }) => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        if (homePage) {
            return navigate('/all-toys');
        }
    };
    return (
        <div onClick={handleRedirect} className='container px-5 mx-auto py-10'>
            <div className='grid lg:grid-cols-2 lg:w-3/4 mx-auto items-center gap-5 p-[22px] bg-pink-600 rounded-[51px] shadow'>
                <div className='flex items-center justify-center lg:justify-start gap-5'>
                    <button
                        onClick={handleSearch}
                        type='submit'
                        className='bg-[#FAE527] rounded-full p-3'
                    >
                        <CiSearch className='w-[42px] h-[42px]' />
                    </button>
                    <h4 className="text-white text-[32px] font-semibold font-['Nunito'] leading-normal">
                        Find your product
                    </h4>
                </div>
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDownCapture={(e) => e.key === 'Enter' && handleSearch()}
                    value={searchTerm}
                    className="bg-white rounded-[29px] text-stone-600 text-2xl font-semibold font-['Nunito'] leading-normal outline-none py-2 h-[58px] w-full px-4"
                    type='search'
                    placeholder='Search'
                    name='search'
                    id='search'
                />
            </div>
        </div>
    );
};

export default SearchBar;

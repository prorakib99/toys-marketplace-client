import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Rating } from 'primereact/rating';
import { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

const MyToys = () => {
    const [myToys, setMyToys] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/toys')
            .then((res) => res.json())
            .then((data) => {
                setMyToys(data);
            });
    });

    const imageBodyTemplate = (toy) => {
        return (
            <div className='drop-shadow-xl h-24 w-32 p-3 bg-white rounded-lg'>
                <img src={toy.picture} alt='' className='w-full h-full rounded-lg' />
            </div>
        );
    };

    const categoryBodyTemplate = (toy) => {
        return <h4>{toy.category}</h4>;
    };

    const priceBodyTemplate = (toy) => {
        return <h4>${toy.price}</h4>;
    };

    const ratingBodyTemplate = (toy) => {
        return (
            <Rating
                className='!text-pink-500 flex gap-1'
                value={toy.ratings}
                readOnly
                cancel={false}
            />
        );
    };
    const editBodyTemplate = (toy) => {
        return (
            <button className="text-gray-700 text-base font-medium font-['Inter'] leading-normal rounded-md">
                <FaRegEdit className='text-2xl' />
            </button>
        );
    };
    const deleteBodyTemplate = (toy) => {
        return (
            <button className="bg-pink-600 text-white text-base font-medium font-['Inter'] leading-normal rounded-md px-3 lg:px-5 py-2">
                Delete
            </button>
        );
    };
    const header = () => {
        return <div className='text-center py-3 text-3xl text-pink-500'>My Toys</div>;
    };
    const footer = () => {
        return <div>In total there are 5 products.</div>;
    };
    return (
        <div className='container mx-auto px-5'>
            <div className='py-10'>
                <DataTable
                    value={myToys}
                    header={header}
                    footer={footer}
                    tableStyle={{ minWidth: '60rem' }}
                >
                    <Column header='Image' body={imageBodyTemplate}></Column>
                    <Column field='name' header='Name'></Column>
                    <Column field='price' header='Price' body={priceBodyTemplate}></Column>
                    <Column field='category' header='Category' body={categoryBodyTemplate}></Column>
                    <Column field='rating' header='Reviews' body={ratingBodyTemplate}></Column>
                    <Column field='edit' header='Edit' body={editBodyTemplate}></Column>
                    <Column field='delete' header='Delete' body={deleteBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default MyToys;

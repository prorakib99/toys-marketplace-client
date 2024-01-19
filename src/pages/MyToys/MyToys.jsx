import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Rating } from 'primereact/rating';
import { useContext, useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const MyToys = () => {
    const [myToys, setMyToys] = useState([]);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    // data load
    useEffect(() => {
        fetch(`http://localhost:5000/my-toys?email=${user?.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('toy-access-token')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setMyToys(data);
                } else {
                    return navigate('/');
                }
            });
    }, []);

    // Delete & Update
    const confirmDelete = (_id) => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Are you sure that you want to delete it?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(_id)
                },
                {
                    label: 'No'
                }
            ]
        });
    };
    const handleDelete = (_id) => {
        fetch(`http://localhost:5000/my-toys/${_id}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remaining = myToys.filter((toy) => toy._id !== _id);
                    setMyToys(remaining);
                }
            });
    };

    const handleUpdate = (_id) => {
        console.log(_id);
    };

    // Table Content
    const imageBodyTemplate = (toy) => {
        return (
            <div className='drop-shadow-xl h-24 w-32 p-3 mx-auto bg-white rounded-lg'>
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
                className='justify-center flex gap-1'
                value={toy.ratings}
                readOnly
                cancel={false}
                pt={{
                    onIcon: { className: 'text-pink-500' }
                }}
            />
        );
    };
    const editBodyTemplate = (toy) => {
        return (
            <button
                onClick={() => handleUpdate(toy._id)}
                className="text-gray-700 text-base font-medium font-['Inter'] leading-normal rounded-md"
            >
                <FaRegEdit className='text-2xl' />
            </button>
        );
    };
    const deleteBodyTemplate = (toy) => {
        return (
            <button
                onClick={() => confirmDelete(toy._id)}
                className="bg-pink-600 text-white text-base font-medium font-['Inter'] leading-normal rounded-md px-3 lg:px-5 py-2"
            >
                Delete
            </button>
        );
    };
    const header = () => {
        return <div className='text-center py-3 text-3xl text-pink-500'>My Toys</div>;
    };
    const footer = () => {
        return <div>In total there are {myToys.length} products.</div>;
    };
    return (
        <div className='container mx-auto px-5'>
            <div className='py-10'>
                <DataTable
                    value={myToys}
                    header={header}
                    footer={footer}
                    tableStyle={{ minWidth: '60rem' }}
                    pt={{
                        table: { className: 'border border-blur' }
                    }}
                >
                    <Column
                        header='Image'
                        pt={{
                            bodyCell: { className: 'text-center text-lg border border-blur' },
                            headerContent: { className: 'flex justify-center' }
                        }}
                        body={imageBodyTemplate}
                    ></Column>
                    <Column
                        field='name'
                        pt={{
                            bodyCell: { className: 'text-center text-lg border border-blur' },
                            headerContent: { className: 'flex justify-center' }
                        }}
                        header='Name'
                    ></Column>
                    <Column
                        field='price'
                        pt={{
                            bodyCell: { className: 'text-center text-lg border border-blur' },
                            headerContent: { className: 'flex justify-center' }
                        }}
                        header='Price'
                        body={priceBodyTemplate}
                    ></Column>
                    <Column
                        field='category'
                        pt={{
                            bodyCell: { className: 'text-center text-lg border border-blur' },
                            headerContent: { className: 'flex justify-center' }
                        }}
                        header='Category'
                        body={categoryBodyTemplate}
                    ></Column>
                    <Column
                        field='rating'
                        pt={{
                            bodyCell: { className: 'text-center text-lg border border-blur' },
                            headerContent: { className: 'flex justify-center' }
                        }}
                        header='Reviews'
                        body={ratingBodyTemplate}
                    ></Column>
                    <Column
                        field='edit'
                        pt={{
                            bodyCell: { className: 'text-center text-lg border border-blur' },
                            headerContent: { className: 'flex justify-center' }
                        }}
                        header='Edit'
                        body={editBodyTemplate}
                    ></Column>
                    <Column
                        field='delete'
                        pt={{
                            bodyCell: { className: 'text-center text-lg border border-blur' },
                            headerContent: { className: 'flex justify-center' }
                        }}
                        header='Delete'
                        body={deleteBodyTemplate}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default MyToys;

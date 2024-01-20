import React from 'react';
import FormModal from '../Shared/FormModal/FormModal';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Rating } from 'primereact/rating';
import { useContext, useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
    Textarea,
    useDisclosure
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import Loader from '../Shared/Loader/Loader';

const MyToys = () => {
    const [myToys, setMyToys] = useState([]);
    const [selectToy, setSelectToy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updateCount, setUpdateCount] = useState(0);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    // Update Toy
    const [value, setValue] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    // data load
    useEffect(() => {
        fetch(`https://toys-marketplace-server-nine.vercel.app/my-toys?email=${user?.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('toy-access-token')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setMyToys(data);
                    setLoading(false);
                } else {
                    return navigate('/');
                }
            });
    }, [updateCount]);

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
        fetch(`https://toys-marketplace-server-nine.vercel.app/my-toys/${_id}`, {
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

    const handleUpdateClicked = (_id) => {
        setLoading(true);
        setValue(null);
        fetch(`https://toys-marketplace-server-nine.vercel.app/my-toys/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                setSelectToy(data);
                setLoading(false);
            });
        onOpen();
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = parseFloat(form.price.value).toFixed(2);
        const picture = form.photo.value;
        const category = form.category.value;
        const categoryID = form.category.options.selectedIndex;
        const seller = form.user.value;
        const email = form.email.value;
        const stock = parseInt(form.stock.value);
        const ratings = value || selectToy?.ratings;
        const description = form.description.value;

        if (isNaN(price)) {
            return alert('Price Allow only Number');
        }

        const updateToy = {
            name,
            price,
            picture,
            category,
            categoryID,
            seller,
            email,
            stock,
            ratings,
            description
        };

        fetch(`https://toys-marketplace-server-nine.vercel.app/my-toys?id=${selectToy._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateToy)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    onClose();
                    setUpdateCount(updateCount + 1);
                    toast.success(`Toy Update Successful`);
                }
            });
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
                onClick={() => handleUpdateClicked(toy._id)}
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
        return (
            <div className='text-center py-3 text-3xl text-pink-500'>My Toys: {myToys.length}</div>
        );
    };
    const footer = () => {
        return <div>In total there are {myToys.length} products.</div>;
    };

    if (loading) {
        return <Loader></Loader>;
    }
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
            {/* Modal */}
            {loading ? (
                ''
            ) : (
                <FormModal
                    initialRef={initialRef}
                    finalRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                    handleUpdate={handleUpdate}
                    setValue={setValue}
                    value={value}
                    toy={selectToy}
                ></FormModal>
            )}
            {/* Modal End */}
        </div>
    );
};

export default MyToys;

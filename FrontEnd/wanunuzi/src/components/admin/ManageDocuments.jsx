import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../Config.js';
import { Dialog, Transition } from '@headlessui/react';

const UserDocuments = ({ match }) => {
    const [documents, setDocuments] = useState([]);
    const { id: userId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetching documents of a specific user
        axios.get(`${config.BASE_API_URL}/admin/getDocuments/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            }
        })
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.error("Error fetching documents", error);
            });
    }, [userId]);

    const handleStatusChange = (id, newStatus) => {
        const token = localStorage.getItem('token');
        axios.put(`${config.BASE_API_URL}/admin/updateDocument/${id}`, { status: newStatus }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            }
        })
            .then(() => {
                // Refresh the documents after a status update
                const token = localStorage.getItem('token');
                return axios.get(`${config.BASE_API_URL}/admin/getDocuments/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token,
                    }
                })
            })
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.error("Error updating document status", error);
            });
    };

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>



            <h2>Documents</h2>
            <table className={'table'}>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Document</th>  {/* New column header for documents */}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {documents.map(doc => (
                    <tr key={doc.id}>
                        <td>{doc.type}</td>
                        <td>{doc.status}</td>


                        <td>
                            <div className={'w-full'}>
                                <figure className={'w-full object-cover'}>
                                    <img src={`${config.BASE_API_URL}/${doc.imagePath}`}
                                         alt={doc.type}
                                            className={'aspect-video w-30'}
                                         onClick={() => openModal(`${config.BASE_API_URL}/${doc.imagePath}`)} />
                                </figure>
                            </div>
                        </td>


                        <td className={'flex gap-2'}>

                            <div data-tip={"Change Status to verified"} className={'tooltip'}>
                                <button className={'btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-70'} onClick={() => handleStatusChange(doc.id, 'Verified')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-customGreen" fill="none"    viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                            </div>

                            <div data-tip={"Change Status to Pending"} className={'tooltip'}>
                                <button className={'btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-70'} onClick={() => handleStatusChange(doc.id, 'Pending')}>
                                    <span className="loading loading-spinner"></span>
                                </button>
                            </div>

                            <div data-tip={"Change Status to Rejected"} className={'tooltip'}>
                                <button className={'btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-70'} onClick={() => handleStatusChange(doc.id, 'Rejected')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-customGreen" fill="none"    viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Transition appear show={isModalOpen} as={React.Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                        <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Document</Dialog.Title>

                                <div className="mt-2">
                                    <img src={selectedImage} alt="Selected" className="w-full object-cover h-60" />
                                </div>

                                <div className="mt-4">
                                    <button type="button" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" onClick={closeModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default UserDocuments;

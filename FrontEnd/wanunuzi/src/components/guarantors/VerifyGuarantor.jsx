import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import config from '../../../config.js';

Modal.setAppElement('#root');

function VerifyGuarantor() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const loanUser = searchParams.get('loanUser');
    const loanId = searchParams.get('loanId');
    const guarantor = searchParams.get('guarantor');

    const [loanData, setLoanData] = useState({});
    const [guarantorData, setGuarantorData] = useState({});
    const [loanUserData, setLoanUserData] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [newAmount, setNewAmount] = useState('');
    const [guaranteeData, setGuaranteeData] = useState({});

    useEffect(() => {
        axios.get(`${config.BASE_API_URL}/guarantor-data/${guarantor}/${loanId}`)
            .then(response => {
                setGuaranteeData(response.data);
                //console.log('GuaranteeData', response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    },[]);

    useEffect(() => {
        axios.get(`${config.BASE_API_URL}/loan/${loanId}`)
            .then(response => {
                setLoanData(response.data);
                //console.log('Loan', response.data);
                console.log ('loan amount', response.data.amount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`${config.BASE_API_URL}/user/email/${encodeURIComponent(guarantor)}`)
            .then(response => {
                setGuarantorData(response.data);
                //console.log('Guarantor', response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`${config.BASE_API_URL}/user/${loanUser}`)
            .then(response => {
                setLoanUserData(response.data);
                //console.log('LoanUser', response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [loanId, guarantor, loanUser]);

    const handleAccept = () => {

        if (newAmount > loanData.amount) {
            setModalMessage('The amount you have entered is greater than the loan amount.')
            setIsOpen(true);
            return;
        }

        const guaranteeAmount = newAmount !== '' ? newAmount : guaranteeData.guaranteeAmount;

        axios.post(`${config.BASE_API_URL}/guarantor-decision`, {
            loanId,
            guarantorId: guarantorData.id,
            decision: 'accepted',
            guaranteeAmount,
        })
            .then(response => {
                setModalMessage('You have accepted the guarantor role for this loan.');
                setIsOpen(true);
            })
            .catch(error => {
                setModalMessage(error.response.data.message);
                setIsOpen(true);
            });
    };

    const handleReject = () => {
        axios.post(`${config.BASE_API_URL}/guarantor-decision`, {
            loanId,
            guarantorId: guarantorData.id,
            decision: 'rejected',
        })
            .then(response => {
                setModalMessage('You have rejected the guarantor role for this loan.');
                setIsOpen(true);
            })
            .catch(error => {
                setModalMessage(error.response.data.message);
                setIsOpen(true);
            });
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="container mx-auto py-4 px-4">
            <h1 className="text-2xl font-bold mb-4">Verify Guarantor</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded shadow overflow-clip">
                    <h2 className="text-xl font-bold mb-2">Loan User Data:</h2>
                    {Object.entries(loanUserData).map(([field, value]) => (
                        <p key={field}>
                            {field}: {value}
                        </p>
                    ))}
                </div>
                <div className="p-4 border rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Loan Data:</h2>
                    {Object.entries(loanData).map(([field, value]) => (
                        <p key={field}>
                            {field}: {value}
                        </p>
                    ))}
                </div>
                <div className="p-4 border rounded shadow overflow-clip">
                    <h2 className="text-xl font-bold mb-2">Guarantor Data:</h2>
                    {Object.entries(guarantorData).map(([field, value]) => (
                        <p key={field}>
                            {field}: {value}
                        </p>
                    ))}
                    <div className="mt-4">
                        <label htmlFor="newAmount" className="block text-sm font-medium text-gray-700">
                            New Guarantee Amount:
                        </label>
                        <input
                            type="number"
                            id="newAmount"
                            className="input input-bordered input-warning w-full max-w-xs"
                            placeholder="Enter the new guarantee amount"
                            value={newAmount}
                            onChange={e => setNewAmount(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                    onClick={handleAccept}
                >
                    Accept
                </button>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={handleReject}
                >
                    Reject
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                    },
                }}
                contentLabel="Example Modal"
                className="rounded ring-2 ring-offset-1 ring-customGreen border-0 shadow-sm bg-white p-4"
            >
                <h2>Message</h2>
                <p>{modalMessage}</p>
                <div className="btn flex items-center place-items-center justify-center rounded w-8 text-2xl min-h-8 max-h-8 m-0 p-0 btn-outline absolute top-0 right-0" onClick={closeModal}>
                    <i className={"fas fa-times m-0"}></i>
                </div>
            </Modal>
        </div>
    );
}

export default VerifyGuarantor;

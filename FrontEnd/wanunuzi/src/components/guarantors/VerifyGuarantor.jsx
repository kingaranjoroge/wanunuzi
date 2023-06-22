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

    useEffect(() => {
        axios.get(`${config.BASE_API_URL}/loan/${loanId}`)
            .then(response => {
                setLoanData(response.data);
            })
            .catch(error => {
                //console.error('There was an error!', error);
            });

        axios.get(`${config.BASE_API_URL}/user/email/${encodeURIComponent(guarantor)}`)
            .then(response => {
                setGuarantorData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`${config.BASE_API_URL}/user/${loanUser}`)
            .then(response => {
                setLoanUserData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [loanId, guarantor, loanUser]);

    const handleAccept = () => {
        axios.post(`${config.BASE_API_URL}/guarantor-decision`, {
            loanId,
            guarantorId: guarantorData.id,
            decision: 'accepted'
        })
            .then(response => {
                //console.log(response.data);
                setModalMessage('You have accepted the guarantor role for this loan.');
                setIsOpen(true);
            })
            .catch(error => {
                //console.error('There was an error!', error);
                setModalMessage(error.response.data.message);
                setIsOpen(true);
            });
    };

    const handleReject = () => {
        axios.post(`${config.BASE_API_URL}/guarantor-decision`, {
            loanId,
            guarantorId: guarantorData.id,
            decision: 'rejected'
        })
            .then(response => {
                //console.log(response.data);
                setModalMessage('You have rejected the guarantor role for this loan.');
                setIsOpen(true);
            })
            .catch(error => {
                //console.error('There was an error!', error);
                setModalMessage(error.response.data.message);
                setIsOpen(true);
            });
    };


    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className="container mx-auto py-4 px-4">
            <h1 className="text-2xl font-bold mb-4">Verify Guarantor</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Loan User Data:</h2>
                    <p>Name: {loanUserData.fullName}</p>
                    <p>Email: {loanUserData.email}</p>
                    <p>Phone Number: {loanUserData.phoneNumber}</p>
                </div>
                <div className="p-4 border rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Loan Data:</h2>
                    <p>Amount: {loanData.amount}</p>
                    <p>Interest Rate: {loanData.interestRate}</p>
                    <p>Start Date: {loanData.startDate}</p>
                    <p>Due Date: {loanData.dueDate}</p>
                    <p>Status: {loanData.status}</p>
                </div>
                <div className="p-4 border rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Guarantor Data:</h2>
                    <p>Name: {guarantorData.fullName}</p>
                    <p>Email: {guarantorData.email}</p>
                    <p>Phone Number: {guarantorData.phoneNumber}</p>
                </div>
            </div>
            <div className="mt-4">
                <button className="bg-green-500 text-white py-2 px-4 rounded mr-2" onClick={handleAccept}>
                    Accept
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={handleReject}>
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
                    }
                }}
                contentLabel="Example Modal"
            >
                <h2>Message</h2>
                <p>{modalMessage}</p>
                <button className="btn btn-circle btn-outline" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </Modal>
        </div>
    );
}

export default VerifyGuarantor;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../Config.js';
import { Button, TextField } from '@material-ui/core';

const LoanDetail = () => {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchLoan().then(r => console.log('Loan fetched'));
    }, [id]);

    const fetchLoan = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.BASE_API_URL}/admin/getLoan/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        setLoan(response.data.loan);
        setAmount(response.data.loan.amount);
        setStatus(response.data.loan.status);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleUpdateClick = async () => {
        const token = localStorage.getItem('token');
        await axios.put(`${config.BASE_API_URL}/admin/updateLoan/${id}`,
            { amount, status },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            }
        );
        await fetchLoan();
    };

    return (
        <div className="p-6">
            {loan && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Loan Details</h2>
                    <div className="p-4 border rounded flex items-center gap-3">
                        <p>Loan ID: {loan.id}</p>
                        <p>Loan Applied By: {loan.User.fullName}</p>
                    </div>
                    <TextField className="w-full" label="Amount" value={amount} onChange={handleAmountChange} />
                    <TextField select className="w-full" label="Status" value={status} onChange={handleStatusChange} SelectProps={{ native: true }}>
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="guaranteed">Guaranteed</option>
                    </TextField>
                    <Button variant="contained" color="primary" onClick={handleUpdateClick}>Update Loan</Button>
                    <h2 className="text-2xl font-bold">Guarantors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {loan.Guarantors.map((guarantor, index) => (
                        <div key={index} className="p-4 border w-full rounded space-y-2">
                            <p>Name: {guarantor.User.fullName}</p>
                            <p>Phone Number: {guarantor.User.phoneNumber}</p>
                            <p>Email: {guarantor.User.email}</p>
                            <p>Guarantee Amount: {guarantor.guaranteeAmount}</p>
                            <p>Decision: {guarantor.decision}
                                {guarantor.decision === "accepted" ?
                                    <i className="fas fa-check text-green-500 ml-2"></i> :
                                    <i className="fas fa-times text-red-500 ml-2"></i>
                                }
                            </p>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoanDetail;
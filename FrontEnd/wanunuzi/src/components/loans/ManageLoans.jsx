import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import config from '../../../Config.js';

const ManageLoans = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            console.log(decoded);

            const fetchLoans = async () => {
                try {
                    const response = await axios.get(`${config.BASE_API_URL}/loan/user/${decoded.userId}`);
                    setLoans(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch loans: ", error);
                    setLoading(false);
                }
            };

            fetchLoans();
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">Your Loans</h1>
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Loan ID</th>
                    <th>Amount</th>
                    <th>Interest Rate</th>
                    <th>Amount to be Paid</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Guarantors</th>
                    <th>Guarantor Decisions</th>
                </tr>
                </thead>
                <tbody>
                {loans.map((loan) => {
                    const months = moment(loan.dueDate).diff(moment(), 'months');
                    const interest = (loan.amount * (loan.interestRate/100)) * months;
                    const amountToBePaid = parseFloat(loan.amount) + interest;

                    console.log(loan);

                    return (
                        <tr key={loan.id}>
                            <th>{loan.id}</th>
                            <td>{loan.amount}</td>
                            <td>{loan.interestRate}%</td>
                            <td>{amountToBePaid.toFixed(2)}</td>
                            <td>{new Date(loan.startDate).toLocaleDateString()}</td>
                            <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                            <td>{loan.status}</td>
                            <td>
                                {loan.guarantors && loan.guarantors.length > 0 ? (
                                    loan.guarantors.map((guarantor) => (
                                        <p key={guarantor.id}>Guarantor ID: {guarantor.userId}</p>
                                    ))
                                ) : (
                                    <p>No guarantors for this loan</p>
                                )}
                            </td>
                            <td>
                                {loan.guarantors && loan.guarantors.length > 0 ? loan.guarantors.map((guarantor) => (
                                    guarantor.guarantorDecision ? (
                                        <div key={guarantor.guarantorDecision.id}>
                                            <p>Guarantor ID: {guarantor.userId}</p>
                                            <p>Decision: {guarantor.guarantorDecision.decision}</p>
                                        </div>
                                    ) : (
                                        <p>No decision from Guarantor ID: {guarantor.userId}</p>
                                    )
                                )) : (
                                    <p>No guarantor decisions for this loan</p>
                                )}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ManageLoans;

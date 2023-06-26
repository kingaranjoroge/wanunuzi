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

            const fetchLoans = async () => {
                try {
                    const response = await axios.get(`${config.BASE_API_URL}/loan/user/${decoded.userId}`);
                    const mappedLoans = await Promise.all(response.data.map(async (loan) => {
                        const months = moment(loan.dueDate).diff(moment(), 'months');
                        const interest = (loan.amount * (loan.interestRate / 100)) * months;
                        const amountToBePaid = parseFloat(loan.amount) + interest;
                        const guarantors = await Promise.all(loan.guarantorDecisions.map(async (decision) => {
                            const guarantorResponse = await axios.get(`${config.BASE_API_URL}/user/${decision.userId}`);
                            const guarantorUsername = guarantorResponse.data.fullName;
                            return {
                                guarantorId: decision.userId,
                                guarantorUsername: guarantorUsername,
                                decision: decision.decision,
                            };
                        }));

                        return {
                            id: loan.id,
                            amount: loan.amount,
                            interestRate: loan.interestRate,
                            startDate: loan.startDate,
                            dueDate: loan.dueDate,
                            status: loan.status,
                            guarantors: guarantors,
                            amountToBePaid: amountToBePaid.toFixed(2),
                        };
                    }));

                    setLoans(mappedLoans);
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
                {loans.map((loan) => (
                    <tr key={loan.id}>
                        <th>{loan.id}</th>
                        <td>{loan.amount}</td>
                        <td>{loan.interestRate}%</td>
                        <td>{loan.amountToBePaid}</td>
                        <td>{new Date(loan.startDate).toLocaleDateString()}</td>
                        <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                        <td>{loan.status}</td>
                        <td>
                            {loan.guarantors.length > 0 ? (
                                <div>
                                    {loan.guarantors.map((guarantor, index) => (
                                        <div className={'flex gap-1 my-3 border-y-2 border-gray-400 py-2'} key={index}>
                                            <div className="avatar">
                                                <div className="w-6 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={`https://api.dicebear.com/6.x/shapes/svg?seed=${guarantor.guarantorUsername}`} alt={''} />
                                                </div>
                                            </div>
                                            {/*<p>Name {index + 1}: {guarantor.guarantorUsername}</p>*/}
                                            <p> {guarantor.guarantorUsername}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No guarantors for this loan</p>
                            )}
                        </td>
                        <td>
                            {loan.guarantors.length > 0 ? (
                                <div>
                                    {loan.guarantors.map((guarantor, index) => (
                                        <div className={'flex gap-3 my-3 border-y-2 border-gray-400 py-2'} key={index}>
                                            {/*<p>: {guarantor.guarantorUsername}</p>*/}
                                            <div className="avatar">
                                                <div className="w-6 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={`https://api.dicebear.com/6.x/shapes/svg?seed=${guarantor.guarantorUsername}`} alt={''} />
                                                </div>
                                            </div>
                                            <p>{guarantor.decision}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No guarantor decisions for this loan</p>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageLoans;

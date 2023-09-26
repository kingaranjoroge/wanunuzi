import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import config from '../../../Config.js';
import TestNav from "../navbar/testNav.jsx";

const ManageLoans = () => {

    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            const fetchLoans = async () => {
                try {
                    const response = await axios.get(`${config.BASE_API_URL}/loan/user/${decoded.userId}`
                        , {
                            headers: {
                                'Content-Type': 'application/json',
                                'x-auth-token': token,
                            }
                        });
                    const mappedLoans = response.data.map((loan) => {
                        const months = moment(loan.dueDate).diff(moment(), 'months');
                        const interest = (loan.amount * (loan.interestRate / 100)) * months;
                        const amountToBePaid = parseFloat(loan.amount) + interest;

                        return {
                            id: loan.id,
                            amount: loan.amount,
                            interestRate: loan.interestRate,
                            startDate: loan.startDate,
                            dueDate: loan.dueDate,
                            status: loan.status,
                            amountToBePaid: amountToBePaid.toFixed(2),
                        };
                    });
                    setLoans(mappedLoans);
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch loans: ", error);
                    setLoading(false);
                }
            };

            fetchLoans().then(r =>
                console.log("")
            );
        }
    }, []);

    const handleViewDetails = (loanId) => {
        navigate(`/loan-data/${loanId}`);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col overflow-x-auto w-full h-full">
            <TestNav />
            <div className="flex flex-col items-center justify-center w-full h-full">
                {loans.length === 0 ? (
                    <div className={'flex flex-col items-center h-full max-w-xs my-[100px]'}>
                        <h1 className="text-2xl font-bold mb-4 mt-4">You have no loans</h1>
                        <a className={'py-1 w-full my-2'} href="/loan"><button className="btn w-full text-sm my-2 btn-outline btn-warning ring-2 ring-offset-1 ring-customGreen py-1">Apply Now <i
                            className="fa-solid fa-arrow-right"></i></button></a>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-fit">
                        <h1 className="text-3xl font-bold mb-4 mt-4">Your Loans</h1>

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
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id}>
                                    <th className={'w-1'}>{loan.id}</th>
                                    <td className={'w-1'}>{loan.amount}</td>
                                    <td className={'w-1'}>{loan.interestRate}%</td>
                                    <td className={'w-1'}>{loan.amountToBePaid}</td>
                                    <td className={'w-1'}>{new Date(loan.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                                    <td>{loan.status}</td>
                                    <td data-tip={`View Loan ${loan.id} `} className={'tooltip'}>
                                        <button className={'btn btn-circle ring-offset-1 border-2 border-warning bg-warning ring-2 ring-inset ring-white hover:bg-customGreen hover:border-customGreen'} onClick={() => handleViewDetails(loan.id)}>
                                            <i className={'fa-solid fa-mountain'}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageLoans;
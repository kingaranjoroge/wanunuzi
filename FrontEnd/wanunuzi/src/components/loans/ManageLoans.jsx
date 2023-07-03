import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import config from '../../../Config.js';
import TestNav from "../navbar/testNav.jsx";

const ManageLoans = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [amount, setAmount] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setUser(decoded);
        }
    }, []);

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
                                amount: decision.guaranteeAmount,
                            };
                        }));
                        console.log('guarantorResponse', guarantors)

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

    function handleAddGuarantor(id, guarantorId) {
        console.log('Add guarantor for loan with id:', id);
    }

    async function handleReAddGuarantor(id, guarantorId, guaranteeAmount) {
        const loanId = id;
        const userId = user.userId;
        //const guarantorId = guarantorId;
        const guarantorAmount = guaranteeAmount;

        try {
            const response = await axios.post(`${config.BASE_API_URL}/addOneGuarantorToLoan`, {
                loanId,
                userId,
                guarantorId,
                guarantorAmount,
            });

        }
        catch (error) {
            console.error('Failed to re-add guarantor:', error);
        }
    }

    return (
            <div className="flex flex-col overflow-x-auto w-full h-full">
                <TestNav />
                <div className="flex flex-col items-center justify-center w-full h-full">
            {/*if no loans are available*/}

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
                    <th>Guarantors</th>
                    <th>Guarantor Decisions</th>
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
                        <td>
                            {loan.guarantors.length > 0 ? (
                                <div>
                                    {loan.guarantors.map((guarantor, index) => (
                                        <div className={'flex gap-3 my-3 border-y-2 border-gray-400 py-2'} key={index}>
                                            {
                                                guarantor.decision === 'pending' ? (
                                                    <div className="avatar">
                                                        <div className="w-6 max-h-6 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={`https://api.dicebear.com/6.x/shapes/svg?seed=${guarantor.guarantorUsername}`} alt={''} />
                                                        </div>
                                                    </div>
                                                ) : guarantor.decision === 'accepted' ? (
                                                    <div className="avatar online">
                                                        <div className="w-6 max-h-6 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={`https://api.dicebear.com/6.x/shapes/svg?seed=${guarantor.guarantorUsername}`} alt={''} />
                                                        </div>
                                                    </div>
                                                ) : guarantor.decision === 'rejected' ? (
                                                    <div className="avatar offline">
                                                        <div className="w-6 max-h-6 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={`https://api.dicebear.com/6.x/shapes/svg?seed=${guarantor.guarantorUsername}`} alt={''} />
                                                        </div>
                                                    </div>
                                                ) : null
                                            }
                                            {/*<p>Name {index + 1}: {guarantor.guarantorUsername}</p>*/}
                                            <p> {guarantor.guarantorUsername}</p>
                                            <p>{guarantor.amount}</p>
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
                                        <div className={'flex gap-3 items-center my-3 border-y-2 border-gray-400 py-2'} key={index}>
                                            {/*<p>: {guarantor.guarantorUsername}</p>*/}
                                            {
                                                guarantor.decision === 'pending' ? (
                                                    <div className="avatar">
                                                        <div className="w-6 max-h-6 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={`https://api.dicebear.com/6.x/shapes/svg?seed=${guarantor.guarantorUsername}`} alt={''} />
                                                        </div>
                                                    </div>
                                                ) : guarantor.decision === 'accepted' ? (
                                                    <div className="avatar online">
                                                        <div className="w-6 max-h-6 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={`https://api.dicebear.com/6.x/shapes/svg?seed=${guarantor.guarantorUsername}`} alt={''} />
                                                        </div>
                                                    </div>
                                                ) : guarantor.decision === 'rejected' ? (
                                                    <div className="avatar offline">
                                                        <div className="w-6 max-h-6 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={`https://api.dicebear.com/6.x/shapes/svg?seed=${guarantor.guarantorUsername}`} alt={''} />
                                                        </div>
                                                    </div>
                                                ) : null
                                            }

                                            <p>{guarantor.decision}</p>
                                            {/* if guarantor rejected show button to add new guarantor*/}
                                            {guarantor.decision === 'rejected' ? (
                                                <section className={'flex gap-2'}>
                                                    <button title={`Add a new guarantor to replace ${guarantor.guarantorUsername}`} className="btn text-1xl btn-sm btn-outline btn-warning py-0" onClick={() => handleAddGuarantor(loan.id, guarantor.guarantorId)}>
                                                        <i className="fa-solid fa-shuffle"></i></button>
                                                    <button title={`Reapply ${guarantor.guarantorUsername} to guarantee the loan `} className="btn text-1xl btn-sm btn-outline btn-danger py-0" onClick={() => handleReAddGuarantor(loan.id, guarantor.guarantorId, guarantor.amount)}>
                                                        <i className="fa-solid fa-rotate"></i></button>
                                                </section>
                                            ) : null}
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
                )}
        </div>
                </div>
    );
};

export default ManageLoans;

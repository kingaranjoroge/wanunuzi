import { useParams } from 'react-router-dom';
import TestNav from "../navbar/testNav.jsx";
import {useEffect, useState} from "react";
import config from "../../../Config";
import axios from "axios";

const LoanDetails = () => {
    const { loanId } = useParams();
    const [loan, setLoan] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchLoan = async () => {
                try {
                    const response = await axios.get(`${config.BASE_API_URL}/loan/${loanId}`
                        , {
                            headers: {
                                'Content-Type': 'application/json',
                                'x-auth-token': token,
                            }
                        });

                    setLoan(response.data);
                } catch (error) {
                    console.error("Failed to fetch loan: ", error);
                }
            }

            fetchLoan().then(
                //do something here
            );
        }
    }, [loanId]);

    return (
        <div>
            <section>
                <TestNav />
            </section>
            <section className={'pb-5'}>
                {loan && (
                    <div className="">
                        <center className="font-bold text-xl mb-2">Loan Details</center>

                        <div className="container p-2 sm:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                <div className="card bordered pt-2">
                                    <figure>
                                        <i className="fas fa-coins text-green-500 text-3xl"></i>
                                    </figure>
                                    <div className="card-body flex items-center justify-center">
                                        <p className="z-30 card-title">Amount</p>
                                        <p>
                                            {loan.amount}
                                        </p>
                                    </div>
                                </div>

                                <div className="card bordered pt-2">
                                    <figure>
                                        <i className="fas fa-percentage text-blue-500 text-3xl"></i>
                                    </figure>
                                    <div className="card-body flex items-center justify-center">
                                        <p className="z-30 card-title">Interest Rate</p>
                                        <p>
                                            {loan.interestRate}
                                        </p>
                                    </div>
                                </div>

                                <div className="card bordered pt-2">
                                    <figure>
                                        <i className="fas fa-calendar-alt text-orange-500 text-3xl"></i>
                                    </figure>
                                    <div className="card-body flex items-center justify-center">
                                        <p className="z-30 card-title">Start Date</p>
                                        <p>
                                            {new Date(loan.startDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="card bordered pt-2">
                                    <figure>
                                        <i className="fas fa-calendar-check text-red-500 text-3xl"></i>
                                    </figure>
                                    <div className="card-body flex items-center justify-center">
                                        <p className="z-30 card-title">Due Date</p>
                                        <p>
                                            {new Date(loan.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="card bordered pt-2">
                                    <figure>
                                        <i className="fas fa-info-circle text-purple-500 text-3xl"></i>
                                    </figure>
                                    <div className="card-body flex items-center justify-center">
                                        <p className="z-30 card-title">Status</p>
                                        <p>
                                            {loan.status}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <center className="font-bold text-lg mt-4 mb-2">Guarantors</center>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loan.Guarantors.map(guarantor => (

                            <div key={guarantor.id} className="card bordered flex gap-3 flex-col p-4">
                                <p className={'flex '}><section className=""><i className="fas fa-user text-blue-500"></i> Name:</section> {guarantor.User.fullName}</p>
                                <p className={'flex '}><section className=""><i className="fas fa-hand-holding-usd text-green-500"></i> Guarantee Amount:</section> {guarantor.guaranteeAmount}</p>
                                <p className={'flex '}><section className=""><i className="fas fa-gavel text-red-500"></i> Decision:</section> {guarantor.decision}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default LoanDetails;
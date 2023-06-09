import React, {useEffect, useState} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const CreateLoanForm = () => {
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [serverResponse, setServerResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/createLoan', { userId, amount, interestRate, dueDate });
            setServerResponse(response.data.message);
        } catch (error) {
            console.error(error);
            setServerResponse('An error occurred while creating the loan.');
        }
    };

    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setUser(decoded);
        }
    }, []);

    return (
        <div className="w-full justify-center h-full pt-28 items-center flex ">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <input className="input input-bordered w-full max-w-xs hidden" type="number" value={user.userId} onChange={e => setUserId(e.target.value)} placeholder={user.userId} required />
                <input className="input input-bordered w-full max-w-xs" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
                <input className="input input-bordered w-full max-w-xs" type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} placeholder="Interest Rate" required />
                <input className="input input-bordered w-full max-w-xs" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Due Date" required />
                <button className="input input-bordered w-full max-w-xs" type="submit">Create Loan</button>
            </form>
            {serverResponse && <div className="mt-4 text-green-500">{serverResponse}</div>}
        </div>
    );
};

export default CreateLoanForm;

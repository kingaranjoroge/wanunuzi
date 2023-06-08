import React, { useState } from 'react';
import axios from 'axios';

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

    return (
        <div>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <input className="input input-bordered w-full max-w-xs" type="number" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" required />
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

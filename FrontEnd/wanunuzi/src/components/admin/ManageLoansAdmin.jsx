import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import config from '../../../Config.js';
import { Link } from 'react-router-dom';
import LiveStartDate from '../date/LiveStartDate.jsx';
import LiveDueDate from '../date/LiveDueDate.jsx';

const ManageLoans = () => {
    const [loans, setLoans] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        fetchLoans().then(r => console.log('Loans fetched'));
    }, []);

    const handleRowClick = (param, event) => {
        setSelectedLoan(param.row);
        setAmount(param.row.amount);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const fetchLoans = async () => {
        const token = localStorage.getItem('token');
        console.log('token', token);
        const response = await axios.get(`${config.BASE_API_URL}/admin/getAllLoans`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        setLoans(response.data.loans);
    };

    const handleUpdateClick = async () => {
        const token = localStorage.getItem('token');
        await axios.put(`${config.BASE_API_URL}/admin/updateLoan/${selectedLoan.id}`,
            { amount, status }, // Send the status too
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            }
        );
        await fetchLoans();
    };


    return (
        <div className="h-[400px] w-full">
            <DataGrid
                className="h-full"
                rows={loans}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    { field: 'User', headerName: 'User Name', width: 150, valueGetter: (params) => params.row.User.fullName },
                    { field: 'amount', headerName: 'Amount', width: 130 },
                    { field: 'interestRate', headerName: 'Interest Rate', width: 150 },
                    { field: 'startDate', headerName: 'Start Date', width: 150, renderCell: (params) => <LiveStartDate date={params.row.startDate} /> },
                    { field: 'dueDate', headerName: 'Due Date', width: 150, renderCell: (params) => <LiveDueDate date={params.row.dueDate} /> },
                    { field: 'status', headerName: 'Status', width: 120 },
                    {
                        field: 'Edit',
                        headerName: 'Edit',
                        sortable: false,
                        width: 100,
                        renderCell: (params) => <Link className="text-blue-500 hover:text-blue-700" title={`Edit loan from ${params.row.User.fullName}`} to={`${config.LIVE_URL}/loan-data/${params.row.id}`}>
                            <i className="fa-solid fa-gear fa-2x fa-spin"></i>
                        </Link>
                    },
                ]}
            />
        </div>
    );
};

export default ManageLoans;
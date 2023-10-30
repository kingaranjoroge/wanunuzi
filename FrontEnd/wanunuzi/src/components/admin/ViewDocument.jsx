import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import config from "../../../Config.js";

const DocumentTable = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        fetchDocuments().then(r => console.log('Documents fetched'));
    }, []);

    const fetchDocuments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.BASE_API_URL}/documents`, {
                headers: {
                    'x-auth-token': token,
                },
            });

            setDocuments(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userId', headerName: 'User ID', width: 130 },
        { field: 'type', headerName: 'Type', width: 130 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'status', headerName: 'Status', width: 130 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={documents} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
};

export default DocumentTable;

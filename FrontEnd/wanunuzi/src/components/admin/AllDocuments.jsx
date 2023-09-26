import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../../Config.js';

const AllDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const token = localStorage.getItem('token');
    const allPossibleDocuments = ['Payslip', 'Passport Photo', 'Identity Card - Front', 'Identity Card - Back', 'Registration Certificate', 'CRB Report', 'Address']; // Add all possible document types here

    useEffect(() => {
        axios.get(`${config.BASE_API_URL}/admin/getAllDocuments`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        })
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.error("Error fetching documents", error);
            });
    }, []);

    // Returns an array of missing documents for a user
    const getMissingDocuments = (userDocuments) => {
        const userDocumentTypes = userDocuments.map(doc => doc.type);
        return allPossibleDocuments.filter(docType => !userDocumentTypes.includes(docType));
    }

    // Aggregate documents by user
    const documentsByUser = documents.reduce((acc, current) => {
        const {User, ...rest} = current;
        const userId = User.id;
        const userName = User.fullName; // Assuming 'fullName' is the attribute for user's full name in your User model
        if(!acc[userId]) acc[userId] = { userName, documents: [], missingDocuments: []};
        acc[userId].documents.push(rest);
        acc[userId].missingDocuments = getMissingDocuments(acc[userId].documents);
        return acc;
    }, {});

    return (
        <div>
            <h2>All Documents</h2>
            <table className={'table'}>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Documents</th>
                    <th>Missing Documents</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(documentsByUser).map(([userId, {userName, documents, missingDocuments}]) => (
                    <tr key={userId}>
                        <td>{userId}</td>
                        <td>{userName}</td>
                        <td>{documents.map(doc => doc.type).join(', ')}</td>
                        <td>{missingDocuments.join(', ')}</td>
                        <td><Link to={`/manage-documents/${userId}`}>
                            <button className={'btn btn-circle tooltip-left ring-offset-1 border-2 border-warning bg-warning ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-70'}
                                    data-tip={"Manage Documents"}>
                                <i className="fa-solid fa-mountain"></i>
                            </button>
                        </Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllDocuments;

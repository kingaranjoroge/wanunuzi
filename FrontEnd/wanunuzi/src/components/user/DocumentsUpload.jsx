import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import 'tailwindcss/tailwind.css';
import '@tailwindcss/forms';
import config from "../../../Config.js";

const documentTypes = ['Payslip', 'Passport Photo', 'Identity Card - Front', 'Identity Card - Back', 'Registration Certificate', 'CRB Report', 'Address'];

const UploadDocuments = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [uploadProgress, setUploadProgress] = useState({});
    const [uploadStatus, setUploadStatus] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({});

    const submitDocument = async (type) => {
        const formData = new FormData();
        formData.append("document", selectedFiles[type].file);
        formData.append("type", type);
        formData.append("description", selectedFiles[type].description);

        const token = localStorage.getItem('token');
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }

        try {
            const response = await axios.post(`${config.BASE_API_URL}/upload`, formData, {
                onUploadProgress: progressEvent => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(prevState => ({ ...prevState, [type]: percentCompleted }));
                },
                headers: {
                    'x-auth-token': token,
                },
            });
            setUploadStatus(prevState => ({ ...prevState, [type]: response.status === 200 ? 'Upload Successful' : 'Upload Failed' }));
        } catch (err) {
            console.error(err);
        }
    };

    const onFileChange = (event, type) => {
        setSelectedFiles(prevState => ({
            ...prevState,
            [type]: { ...prevState[type], file: event.target.files[0] }
        }));
    };

    const onDescriptionChange = (event, type) => {
        setSelectedFiles(prevState => ({
            ...prevState,
            [type]: { ...prevState[type], description: event.target.value }
        }));
    };

    return (
        <div className="container mx-auto flex flex-wrap justify-center p-3 space-x-4 space-y-8">
            <h1 className="text-3xl font-bold my-5 w-full text-center">Upload Documents</h1>
            {documentTypes.map(type => (
                <div key={type} className="card shadow-sm compact side w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
                    <div className="card-body">
                        <h2 className="card-title">{type}</h2>
                        <form onSubmit={handleSubmit(() => submitDocument(type))} className="space-y-6">
                        <label className="cursor-pointer label">
                                <input type="file" accept="image/*" onChange={(event) => onFileChange(event, type)} className="file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs" />
                            </label>
                            <div className="form-control">
                               <textarea
                                   className="textarea textarea-bordered w-full"
                                   rows="3"
                                   placeholder="Enter description"
                                   value={selectedFiles[type]?.description || ''}
                                   onChange={(event) => onDescriptionChange(event, type)}
                               />
                            </div>
                            <div className="w-full rounded h-2 bg-gray-200">
                                <div className="h-2 rounded bg-green-500" style={{width: `${uploadProgress[type] || 0}%`}}></div>
                            </div>
                            <div className="card-actions">
                                <button type="submit" className="btn btn-outline rounded-full">Upload
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                </button>
                            </div>
                        </form>
                        {uploadStatus[type] && (
                            <div className={`mt-6 alert alert-${uploadStatus[type] === 'Upload Successful' ? 'success' : 'error'}`}>
                                {uploadStatus[type]}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UploadDocuments;

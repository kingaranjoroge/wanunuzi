import React, {useEffect, useState} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import Modal from 'react-modal';
import TestNav from "../navbar/testNav.jsx";
import config from '../../../Config.js';

function navigateToLogin() {
    window.location.href = '/login';
}

Modal.setAppElement('#root'); // Replace '#root' with the id of the root element of your application

const CreateLoanForm = () => {
    const [amount, setAmount] = useState('');
    const [interestRate] = useState(10); // Given interest rate is 10%
    const [dueDate, setDueDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [useGuarantor, setUseGuarantor] = useState(null);
    const [showChooseGuarantorModal, setShowChooseGuarantorModal] = useState(true);
    const [balance, setBalance] = useState(null);
    const [loanId, setLoanId] = useState('');
    const [guarantors, setGuarantors] = useState([]);
    const [guarantorID, setGuarantorID] = useState('');
    const [guaranteeAmount, setGuaranteeAmount] = useState('');
    const [verifiedGuarantors, setVerifiedGuarantors] = useState([]);
    const [isGuarantorModalOpen, setIsGuarantorModalOpen] = useState(false);
    const [guarantorName, setGuarantorName] = useState('');
    const [modalMessage, setModalMessage] = useState("");
    const [modalIsErrorOpen, setIsErrorOpen] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.userId) {
            // redirect to /login
            navigateToLogin();
            return;
        }

        // Check if the due date is valid
        const currentDate = moment().startOf('day');
        const selectedDate = moment(dueDate).startOf('day');
        const minDate = moment().add(1, 'month').startOf('day');

        if (selectedDate.isBefore(currentDate)) {
            setServerResponse('Due date cannot be in the past.');
            return;
        }

        if (selectedDate.isBefore(minDate)) {
            setServerResponse('Due date must be at least one month from now.');
            return;
        }

        // Calculate the total amount of guarantors
        const totalGuarantorsAmount = verifiedGuarantors.reduce((total, guarantor) => total + parseFloat(guarantor.guaranteeAmount), 0);

        if (parseFloat(amount) > totalGuarantorsAmount) {
            setServerResponse('The entered amount exceeds the total amounts of the guarantors.');
            //console.log(totalGuarantorsAmount);
            return;
        }

        // check if user chose to use a guarantor
        if (useGuarantor) {
            // set loan limit to user balance
            if (amount > (balance * 3)) {
                setServerResponse('You can apply for up to 300% of your balance when using a guarantor.');
                return;
            }
        } else {
            // set loan limit to 90% of user balance
            if (amount > (balance * 0.9)) {
                // user cannot apply for more than 90% of their balance
                setServerResponse(`You can apply for up to ${balance * 0.9} when not using a guarantor.`);
                return;
            }
        }

        setIsModalOpen(true);
    };

    useEffect(() => {
        // show modal asking whether user wants to use guarantors or not
        setShowChooseGuarantorModal(true);
    }, []);

    const createLoan = async () => {
        try {
            //check if user chose to use a guarantor and prevent submission if guarantors are not 3
            if (useGuarantor) {
                if (guarantors.length !== 3) {
                    setServerResponse('You must choose 3 guarantors.');
                    setIsModalOpen(false);
                    return;
                }
            }
            const response = await axios.post(`${config.BASE_API_URL}/createLoan`, { userId: user.userId, amount, interestRate, dueDate });
            const newLoanId = response.data.loanId;
            setLoanId(newLoanId);
            setServerResponse(response.data.message);
            setIsModalOpen(false);

            // Call addGuarantorsToLoan after creating the loan
            if (useGuarantor){
                await addGuarantorsToLoan(newLoanId);
            }

        } catch (error) {
            console.error(error);
            setServerResponse('An error occurred while creating the loan.');
        }
    }

    useEffect(() => {
        //console.log("loanId:", loanId);
        if (loanId === undefined) {
            // console.log("loanId is undefined");
        } else if (loanId === null) {
            //console.log("loanId is null");
        } else {
            // console.log("loanId:", loanId);
        }
    }, [loanId]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setUser(decoded);
        }
    }, []);

    useEffect(() => {
        if(amount && dueDate){
            const months = moment(dueDate).diff(moment(), 'months');
            const interest = (amount * (interestRate/100)) * months;
            setTotalAmount(parseFloat(amount) + interest);
        }
    }, [amount, dueDate, interestRate]);

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwt_decode(token);
                setUser(decoded);

                try {
                    // Fetch the user's balance
                    const { data } = await axios.get(`${config.BASE_API_URL}/balance/${decoded.userId}`);
                    setBalance(data.balance);
                } catch (error) {
                    console.error('Error fetching balance:', error);
                }
            }
        };

        fetchBalance();
    }, [])

    const addGuarantorsToLoan = async (loanId) => {
        if (guarantors.length < 3) {
            setServerResponse('You must add at least 3 guarantors.');
            return;
        }

        if (guarantors.length > 3) {
            setServerResponse('You can only add up to 3 guarantors.');
            return;
        }

        // Map guarantors to their guarantee amounts
        const guarantorsWithAmounts = guarantors.map(guarantorId => {
            const guarantor = verifiedGuarantors.find(g => g.id === guarantorId);
            if (!guarantor) {
                return null; // Guarantor not found
            }
            return {
                userId: guarantorId,
                guaranteeAmount: guarantor.guaranteeAmount, // Use the guarantee amount for each guarantor
            };
        });

        // Check if any guarantor was not found
        if (guarantorsWithAmounts.includes(null)) {
            setServerResponse('An error occurred while adding the guarantors to the loan.');
            return;
        }

        //console.log('guarantorsWithAmounts:', guarantorsWithAmounts)

        // Post request to add guarantors to loan
        try {
            const response = await axios.post(`${config.BASE_API_URL}/addGuarantorsToLoan`, {
                userId: user.userId,
                loanId,
                guarantors: guarantorsWithAmounts.filter(Boolean), // Filter out any null values
            });
            setServerResponse(response.data.message);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            setServerResponse('An error occurred while adding the guarantors to the loan.');
        }
    };

    const addGuarantor = async (e) => {
        e.preventDefault();

        if (guarantors.includes(guarantorID)) {
            setServerResponse('This Guarantor is already added.');
            setGuarantorID(''); // Reset the input field
            setModalMessage('This Guarantor is already added.')
            setIsErrorOpen(true)
            return;
        }

        // if the id is of the current user then return
        //convert guarantorID to integer
        const guarantorIDInt = parseInt(guarantorID);
        if (guarantorIDInt === user.userId) {
            setServerResponse('You cannot add yourself as a Guarantor.');
            setGuarantorID(''); // Reset the input field
            setModalMessage('You cannot add yourself as a Guarantor.')
            setIsErrorOpen(true)
            return;
        }

        try {
            // Fetch the guarantor's full name
            const guarantorRes = await axios.get(`${config.BASE_API_URL}/user/${guarantorID}`);
            const guarantorName = guarantorRes.data.fullName;

            // Prompt the user to enter the guarantee amount
            setIsGuarantorModalOpen(true);
            setGuarantorName(guarantorName);
        } catch (error) {
            //console.error(error);
            //if the error is 404 then the user does not exist
            if (error.response.status === 404) {
                setServerResponse('User ID does not exist.');
                setModalMessage('User ID does not exist.');
                setIsErrorOpen(true);
            }else{
                setServerResponse('An error occurred while adding a Guarantor.');
            }
        }
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.BASE_API_URL}/addGuarantor`, {
                userId: user.userId,
                guarantorID,
                guaranteeAmount: guaranteeAmount,
            });

            // Add the guarantor to the state variables
            setGuarantors([...guarantors, guarantorID]);
            //console.log('guarantors:', guarantors);
            setVerifiedGuarantors([
                ...verifiedGuarantors,
                {
                    id: guarantorID,
                    name: guarantorName,
                    isVerified: true,
                    guaranteeAmount: guaranteeAmount,
                },
            ]);
            setServerResponse('Guarantor added successfully.');
            setIsGuarantorModalOpen(false); // Close the modal
        } catch (error) {
            console.error(error);
            setServerResponse('An error occurred while adding a Guarantor.');
        }

        setGuarantorID(''); // Reset the input field after adding the guarantor
    };


    const removeGuarantor = (id) => {
        // Remove from guarantors array
        const newGuarantors = guarantors.filter(guarantor => guarantor !== id);
        setGuarantors(newGuarantors);

        // Remove from verifiedGuarantors array
        const newVerifiedGuarantors = verifiedGuarantors.filter(guarantor => guarantor.id !== id);
        setVerifiedGuarantors(newVerifiedGuarantors);
    }

    const closeErrorModal = () => {
        setIsErrorOpen(false);
    };


    return (
        <div className="">
            <TestNav />
            <div className={"flex flex-wrap"}>

                {

                    useGuarantor ? <>
                        <div className={"w-full flex flex-col p-8 items-end md:w-1/2 lg:w-1/2"}>
                            <div className="flex justify-center w-full max-w-xs items-center m-4 gap-2">
                                <h2 className={"font-bold text-2xl text-gray-600 text-center"}>Add Guarantors</h2>
                            </div>


                            {guarantors.length > 0 &&
                                <ul className={"max-w-xs w-full"}>
                                    {verifiedGuarantors.map(guarantor => (
                                        <li className={"flex gap-3 w-full mb-3 items-center justify-between"} key={guarantor.id}>
                                            <input
                                                type="text"
                                                value={`${guarantor.name}` + "     " + `${guarantor.id}` + " " + `${guarantor.isVerified ? '⚡  🕛' : '❌'}` + " " + `${guarantor.guaranteeAmount ? guarantor.guaranteeAmount : ''}`}
                                                readOnly
                                                className="input input-bordered input-accent w-full cursor-not-allowed py-2 px-4 rounded-md"
                                            />
                                            <button className="btn btn-circle ring-offset-1 border-2 border-customGreen bg-customGreen text-white text-2xl ring-2 ring-inset ring-white" onClick={() => removeGuarantor(guarantor.id)}>

                                                <i className="fa-solid fa-trash">
                                                </i>
                                            </button>

                                        </li>
                                    ))}
                                </ul>
                            }


                            {useGuarantor && guarantors.length < 3 ? (
                                <form className={"flex w-full max-w-xs gap-3 items-center justify-center"} onSubmit={addGuarantor}>
                                    <input
                                        className={"input input-bordered w-full flex-grow"}
                                        type={"number"}
                                        required={true}
                                        placeholder={"ID Number"}
                                        value={guarantorID}
                                        onChange={e => setGuarantorID(e.target.value)}
                                    />

                                    <button
                                        className={"btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-700"}
                                        type={"submit"}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </form>
                            ) : <div></div>}
                        </div>

                    </> : <>

                    </>
                }


                <div className={ useGuarantor ?  "w-full p-8 md:w-1/2 lg:w-1/2 flex flex-col justify-center items-start" : "w-full flex flex-col justify-center items-center" }>


                    <div className="flex w-full justify-between max-w-xs m-4 mt-0 pt-5 gap-2">
                        <div className="w-24 h-24 flex flex-col items-center justify-center bg-green-600 text-white rounded-lg shadow-md p-2 transition-transform duration-300 ease-in-out transform hover:scale-110">
                            <i className="fas fa-wallet text-2xl"></i>
                            <span>{balance}</span>
                            <span className="text-[10px]">Balance</span>
                        </div>
                        <div className="w-24 h-24 flex flex-col items-center justify-center bg-red-600 text-white rounded-lg shadow-md p-2 transition-transform duration-300 ease-in-out transform hover:scale-110">
                            <i className="fas fa-user-friends text-2xl"></i>
                            <span>{useGuarantor ? "yes" : "no"}</span>
                            <span className="text-[10px]">Guarantors</span>
                        </div>
                        <div className="w-24 h-24 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-md p-2 transition-transform duration-300 ease-in-out transform hover:scale-110">
                            <i className="fas fa-money-bill-wave text-2xl"></i>
                            <span>{useGuarantor ? balance * 3 : balance * 0.9}</span>
                            <span className="text-[10px]">Loanable Cash</span>
                        </div>
                    </div>

                    <form className="flex w-full justify-between max-w-xs m-4 pt-5 gap-2 flex-col" onSubmit={handleSubmit}>
                        <input className="input input-bordered w-full" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
                        <input className="input input-bordered w-full" type="text" value={`${interestRate}%`} disabled />
                        <input className="input input-bordered w-full" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Due Date" required />
                        {totalAmount && <p className="mt-4 text-green-500">Total amount to be paid: {totalAmount}</p>}

                        <button className="btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800" type="submit">Create Loan</button>
                    </form>
                    {serverResponse && <div className="mt-4 text-green-500">{serverResponse}</div>}
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel="Loan Confirmation Modal"
                        className="w-fit h-fit bg-white border-0 ring-customGreen ring-2 ring-offset-1 rounded shadow-sm p-4 flex flex-col gap-4 justify-center items-center text-center"
                        style={{
                            overlay: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            content: {
                                position: 'relative',
                                top: 'auto',
                                left: 'auto',
                                right: 'auto',
                                bottom: 'auto',
                            }
                        }}
                    >
                        <h2>Confirm Loan</h2>
                        <p>You will pay a total amount of {totalAmount}. Do you want to proceed?</p>
                        <p className="text-red-500">This action cannot be undone.</p>
                        <div className="flex flex-row gap-4">
                            <button className="btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-700" onClick={createLoan}>
                                <i className="fas fa-check"></i>
                            </button>
                            <button className="btn btn-circle ring-offset-1 border-2 border-customGreen bg-customGreen text-white text-2xl ring-2 ring-inset ring-white" onClick={() => setIsModalOpen(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </Modal>

                    <Modal isOpen={isGuarantorModalOpen}
                           style={{
                               overlay: {
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                               },
                               content: {
                                   position: 'relative',
                                   top: 'auto',
                                   left: 'auto',
                                   right: 'auto',
                                   bottom: 'auto',
                               }
                           }}
                           className="rounded ring-2 ring-offset-1 ring-customGreen border-0 shadow-sm bg-white p-4"
                    >
                        <form className={'flex items-center'} onSubmit={handleModalSubmit}>
                            <label>
                                <p>Enter the guarantee amount for {guarantorName}:< /p> <br/>
                                <section className={'flex items-center gap-3'}>
                                    <input
                                        className="input input-bordered w-full max-w-xs"
                                        type="number"
                                        value={guaranteeAmount}
                                        onChange={(e) => setGuaranteeAmount(e.target.value)}
                                        placeholder={`Enter the guarantee amount for ${guarantorName}:`}
                                        required
                                    />
                                    <button className="btn btn-circle ring-2 ring-offset-1 text-2xl" type="submit"> <i className={'fa-solid fa-check'}> < /i></button>
                                </section>
                            </label>
                        </form>
                    </Modal>

                    <Modal
                        isOpen={showChooseGuarantorModal}
                        onRequestClose={() => setShowChooseGuarantorModal(false)}
                        contentLabel="Choose Guarantor Modal"
                        //className="rounded ring-2 ring-offset-1 ring-customGreen border-0 shadow-sm bg-white p-4"
                        //className="w-fit ring-1 ring-offset-1 ring-customGreen h-fit bg-white border-0 rounded shadow-sm p-4 flex flex-col gap-1 justify-center items-center text-center"
                        style={{
                            overlay: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            content: {
                                position: 'relative',
                                top: 'auto',
                                left: 'auto',
                                right: 'auto',
                                bottom: 'auto',
                                border: 'none',
                            }
                        }}

                    >
                        <div className="rounded ring-2 ring-offset-1 ring-customGreen border-0 flex flex-col justify-center place-items-center shadow-sm bg-white p-4">
                            <h1 className={'text-2xl text-customGreen mb-2 font-bold'}>Use Guarantor?</h1>
                            <section className="flex flex-col gap-1">
                                <p>Do you want to use a guarantor for this loan?</p>
                                <p>Your current balance is: {balance} /=</p>
                                <p>With guarantor you can loan up to: {balance * 3} /=</p>
                                <p>Without a guarantor, you can loan up to: {balance * 0.9} /=</p>
                            </section>

                        <div className="flex flex-row gap-4">
                            <button className="btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-70" onClick={() => { setUseGuarantor(true); setShowChooseGuarantorModal(false); }}>
                                <i className="fas fa-check"></i>
                            </button>
                            <button className="btn btn-circle ring-offset-1 border-2 border-customGreen bg-customGreen text-white text-2xl ring-2 ring-inset ring-white" onClick={() => { setUseGuarantor(false); setShowChooseGuarantorModal(false); }}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        </ div>
                    </Modal>

                {/* Modal to handle ERRORS */}

                    <Modal
                        isOpen={modalIsErrorOpen}
                        onRequestClose={closeErrorModal}
                        style={{
                            overlay: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            content: {
                                position: 'relative',
                                top: 'auto',
                                left: 'auto',
                                right: 'auto',
                                bottom: 'auto',
                            },
                        }}
                        contentLabel="Example Modal"
                        className="rounded ring-2 ring-offset-1 ring-customGreen border-0 shadow-sm bg-white p-4 min-w-[300px]"
                    >
                        <h2>Message</h2>
                        <p>{modalMessage}</p>
                        <div className="btn flex items-center place-items-center justify-center rounded w-8 text-2xl min-h-8 max-h-8 m-0 p-0 btn-outline absolute top-0 right-0" onClick={closeErrorModal}>
                            <i className={"fas fa-times m-0"}></i>
                        </div>
                    </Modal>


                </div>
            </div>
        </div>
    );
};

export default CreateLoanForm;
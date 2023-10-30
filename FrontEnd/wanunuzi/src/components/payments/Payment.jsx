<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import jwt_decode from "jwt-decode";
import config from '../../../Config.js';
function navigateToLogin() {
  window.location.href = '/login';
}

function navigateToDashboard() {
  window.location.href = '/dashboard';
}

Modal.setAppElement('#root'); // Set the root element for the Modal

const Payment = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(async () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwt_decode(token);
          try {
            const response = await axios.get(`${config.BASE_API_URL}/user/${decoded.userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (response.data.accountActivated) {
              clearInterval(interval);
              setIsLoading(false);
              setIsActivated(true);
              //redirect to dashboard after 5 seconds
              setTimeout(() => {
                setIsRedirecting(true);
              }, 2000);
              setTimeout(() => {
                navigateToDashboard();
              }, 5000);
            }
          } catch (error) {
            console.error(error);
            clearInterval(interval);
          }
        } else {
          clearInterval(interval);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const submitPayment = async () => {
    setIsLoading(true);
    const amount = 1;
    const userId = 10;
    console.log('userId', userId);

    if (!user.userId) {
      navigateToLogin();
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_API_URL}/payment`, {
        "BusinessShortCode": 174379,
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNjA5MTI1MTIw",
        "Timestamp": "20230609125120",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNumber,
        "PartyB": 174379,
        "PhoneNumber": phoneNumber,
        "CallBackURL": "https://data.wanunuzisacco.or.ke/handler.php",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of X",
        "userId": userId,
      }, {
        headers: {
          'Authorization': 'Basic WjFPc0h0OXY2dnpkZHFyc3hTV0dodng2VmVoQ2lBSUc6SDZ2SWNOVHVCN0ZRU0JEeA=='
        }
      });

      setResponseData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResponseData(null);
    }

    setIsModalOpen(false);
  };

  return (
      <div className="w-full flex flex-col place-items-center h-[90vh] justify-center">
        <form className="w-80 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-green-900">Activation</h2>
          {error && <p className="text-red-500">{error}</p>}
          {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
          <input className="input input-bordered w-full max-w-xs"
                 type="text"
                 id="phoneNumber"
                 required={true}
                 placeholder='Enter Phone Number'
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800" type="submit">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : (isActivated ? <i className="fas fa-check"></i> : 'Pay')}
          </button>
        </form>

        <Modal
            isOpen={isModalOpen || isRedirecting}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Payment Confirmation Modal"
            className="w-fit h-fit bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 justify-center items-center text-center"
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
          {isModalOpen && (
              <>
                <h2 className={"prose text-2xl"}>Payment Confirmation</h2>
                <p>You are about to pay 1. Please confirm your action.</p>
                <div className="flex flex-row gap-4">
                  <button
                      className="btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-700"
                      onClick={submitPayment}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                      className="btn btn-circle ring-offset-1 border-2 border-customGreen bg-customGreen text-white text-2xl ring-2 ring-inset ring-white"
                      onClick={() => setIsModalOpen(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </>
          )}

          {isRedirecting && (
              <>
                <h2 className={"prose text-2xl"}>Successful Payment</h2>
                <p>You will be redirected your dashboard in 5 seconds. <br/> </p>
                <button
                    className="btn w-1/2 bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800"
                    onClick={navigateToDashboard}
                >
                  Redirect
                </button>
              </>
          )}
        </Modal>
      </div>
  );
};

export default Payment;
=======
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import jwt_decode from "jwt-decode";
import config from '../../../Config.js';
function navigateToLogin() {
  window.location.href = '/login';
}

function navigateToDashboard() {
  window.location.href = '/dashboard';
}

Modal.setAppElement('#root'); // Set the root element for the Modal

const Payment = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(async () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwt_decode(token);
          try {
            const response = await axios.get(`${config.BASE_API_URL}/user/${decoded.userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (response.data.accountActivated) {
              clearInterval(interval);
              setIsLoading(false);
              setIsActivated(true);
              //redirect to dashboard after 5 seconds
              setTimeout(() => {
                setIsRedirecting(true);
              }, 2000);
              setTimeout(() => {
                navigateToDashboard();
              }, 5000);
            }
          } catch (error) {
            console.error(error);
            clearInterval(interval);
          }
        } else {
          clearInterval(interval);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const submitPayment = async () => {
    setIsLoading(true);
    const amount = 1;
    const userId = 10;
    console.log('userId', userId);

    if (!user.userId) {
      navigateToLogin();
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_API_URL}/payment`, {
        "BusinessShortCode": 174379,
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNjA5MTI1MTIw",
        "Timestamp": "20230609125120",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNumber,
        "PartyB": 174379,
        "PhoneNumber": phoneNumber,
        "CallBackURL": "https://data.wanunuzisacco.or.ke/handler.php",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of X",
        "userId": userId,
      }, {
        headers: {
          'Authorization': 'Basic WjFPc0h0OXY2dnpkZHFyc3hTV0dodng2VmVoQ2lBSUc6SDZ2SWNOVHVCN0ZRU0JEeA=='
        }
      });

      setResponseData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResponseData(null);
    }

    setIsModalOpen(false);
  };

  return (
      <div className="w-full flex flex-col place-items-center h-[90vh] justify-center">
        <form className="w-80 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-green-900">Activation</h2>
          {error && <p className="text-red-500">{error}</p>}
          {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
          <input className="input input-bordered w-full max-w-xs"
                 type="text"
                 id="phoneNumber"
                 required={true}
                 placeholder='Enter Phone Number'
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800" type="submit">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : (isActivated ? <i className="fas fa-check"></i> : 'Pay')}
          </button>
        </form>

        <Modal
            isOpen={isModalOpen || isRedirecting}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Payment Confirmation Modal"
            className="w-fit h-fit bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 justify-center items-center text-center"
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
          {isModalOpen && (
              <>
                <h2 className={"prose text-2xl"}>Payment Confirmation</h2>
                <p>You are about to pay 1. Please confirm your action.</p>
                <div className="flex flex-row gap-4">
                  <button
                      className="btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-700"
                      onClick={submitPayment}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                      className="btn btn-circle ring-offset-1 border-2 border-customGreen bg-customGreen text-white text-2xl ring-2 ring-inset ring-white"
                      onClick={() => setIsModalOpen(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </>
          )}

          {isRedirecting && (
              <>
                <h2 className={"prose text-2xl"}>Successful Payment</h2>
                <p>You will be redirected your dashboard in 5 seconds. <br>< /br></p>
                <button
                    className="btn w-1/2 bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800"
                    onClick={navigateToDashboard}
                >
                  Redirect
                </button>
              </>
          )}
        </Modal>
      </div>
  );
};

export default Payment;
>>>>>>> 73032f202ab021e03e2bc60d6370cf99c3a84f4e

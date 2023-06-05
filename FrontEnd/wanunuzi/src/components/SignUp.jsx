import React, { useState } from "react";
import axios from 'axios';

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        //if password is not the same as confirm password, return
        if (!confirmPasswordValidity(password, confirmPassword)) {
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/signup', {
                fullName,
                password,
                email,
                phoneNumber,
                idNumber
            });
            window.location.href = "/home";
        } catch (error) {
            //console.error(error);
            setResponse(error.response.data.message);
        }
    };

    function confirmPasswordValidity(password, confirmPassword) {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    }

    //check if password is the same as confirm password

    return (
        <div className="w-full flex flex-col place-items-center h-fit md:h-[90vh] justify-center">
        <form className="w-80 md:w-1/2 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-green-900">Join Us</h2>
            <div className="flex md:flex-row flex-col gap-2 w-full">

            <div className="flex w-full md:w-1/2  flex-col gap-2">

                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                    <input className="input input-bordered input-success w-full max-w-xs"
                           type="text"
                           required={true}
                           placeholder="Full Name"
                           value={fullName}
                           onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your
                        email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                        </div>
                        <input className="pl-[40px] input input-bordered input-success w-full max-w-xs "
                               type="email"
                               id="email-address-icon"
                               required={true}
                               placeholder="email@example.com"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <input className="input input-bordered input-success w-full max-w-xs"
                           type="tel"
                           required={true}
                           placeholder="07********"
                           value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

            </div>


            <div className="flex w-full md:w-1/2 flex-col gap-2">
                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">ID Number</label>
                    <input className="input input-bordered input-success w-full max-w-xs"
                           type="text"
                           required={true}
                           placeholder="*********"
                           value={idNumber}
                           onChange={(e) => setIdNumber(e.target.value)}
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input className="input input-bordered input-success w-full max-w-xs "
                       type="password"
                       required={true}
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                <input className="input input-bordered input-success w-full max-w-xs"
                       type="password"
                       required={true}
                       placeholder="Confirm Password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                          onBlur={() => confirmPasswordValidity(password, confirmPassword)}
                />
                    <p className="error text-red-400 accent-accent">{passwordError}</p>
                </div>
            </div>


            </div>
            <button className="btn w-full md:w-1/2 mt-3 bg-green-400 ring-red-500 ring-offset-2 ring-2" type="submit">Register</button>
            <p className="text-red-800">{response}</p>
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </form>


    </div>
    );
};

export default SignUp;

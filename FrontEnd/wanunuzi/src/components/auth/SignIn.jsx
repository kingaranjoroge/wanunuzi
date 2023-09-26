import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import config from '../../../Config.js';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${config.BASE_API_URL}/login`, { username, password });
      const { message, token } = res.data;
      setResponse(message);

      // Store the token and its expiration time in local storage
      const decoded = jwt_decode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', decoded.exp * 3000); // Convert expiration time to milliseconds

      // Redirect to the home page if the token is valid
      if (token && Date.now() <= localStorage.getItem('expirationTime')) {
        navigate("/home");
      } else {
        setResponse("Session expired. Please log in again.");
      }
    } catch (error) {
      setResponse(error.response.data.message);
    }
  };

  return (
      <div className="relative w-full h-screen overflow-hidden">
        <video
            className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
            type="video/mp4"
            src="../../../saccocut.mp4"
            autoPlay
            loop
            muted
        />
        <div className="absolute z-10 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
          <form className="w-80 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-white">Login</h2>
            <input className="input input-bordered w-full max-w-xs"
                   type="email"
                   placeholder="Enter Email"
                   required={true}
                   value={username}
                   aria-autocomplete="both"
                   autoComplete="email"
                   onChange={(e) => setUsername(e.target.value)}
            />
            <input className="input input-bordered w-full max-w-xs"
                   type="password"
                   placeholder="Password"
                   value={password}
                   required={true}
                   onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800" type="submit">Sign In</button>
            <p>{response}</p>
            <p className={'text-white text-sm'}>Don't have an account? <a className="hover:text-blue-300 text-white text-sm hover:font-bold" href="/register">Sign Up</a></p>
          </form>
        </div>
      </div>
  );
};

export default SignIn;
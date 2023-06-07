import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', { username, password });
      const { message, token } = res.data;
      setResponse(message);

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Redirect to the home page or perform other actions
      navigate("/home");
    } catch (error) {
      setResponse(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex flex-col place-items-center h-[90vh] justify-center">
      <form className="w-80 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-green-900">Login</h2>
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
        <button className="btn w-full bg-green-400 ring-2 ring-red-600" type="submit">Sign In</button>
        <p>{response}</p>
        <p>Don't have an account? <a href="/register">Sign Up</a></p>
      </form>
    </div>
  );
};

export default SignIn;

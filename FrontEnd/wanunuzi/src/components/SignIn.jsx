import React, { useState } from "react";
import axios from 'axios';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/login', { username, password });
            setResponse(res.data.message);
        } catch (error) {
            //console.error(error);
            setResponse(error.response.data.message);
        }
    };

    return (
        <form className="bg-amber-300 flex flex-col gap-2 m-2" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold underline">Sign In</h2>
            <input className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
            <p>{response}</p>
        </form>
    );
};

export default SignIn;

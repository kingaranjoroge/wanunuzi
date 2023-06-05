import React, { useState } from "react";
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/signup', { username, password });
            setResponse(res.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full flex flex-col place-items-center h-[90vh] justify-center">
        <form className="w-80 md:w-1/2 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-green-900">Join Us</h2>
            <div className="flex md:flex-row flex-col gap-2 w-full">

            <div className="flex w-full md:w-1/2  flex-col gap-2">

                <input className="input input-bordered input-success w-full max-w-xs"
                       type="text"
                       required={true}
                       placeholder="Username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />
                <input className="input input-bordered input-success w-full max-w-xs "
                       type="password"
                       required={true}
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <input className="input input-bordered input-success w-full max-w-xs"
                       type="password"
                       required={true}
                       placeholder="Confirm Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex w-full md:w-1/2 flex-col gap-2">
                <input className="input input-bordered input-success w-full max-w-xs"
                       type="text"
                       required={true}
                       placeholder="Username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />
                <input className="input input-bordered input-success w-full max-w-xs "
                       type="password"
                       required={true}
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <input className="input input-bordered input-success w-full max-w-xs"
                       type="password"
                       required={true}
                       placeholder="Confirm Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            </div>
            <button className="btn w-full bg-green-400 ring-red-500 ring-offset-2 ring-2" type="submit">Register</button>
            <p>{response}</p>
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </form>


    </div>
    );
};

export default SignUp;

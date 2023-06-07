import React from 'react';
import NavRight from "./SideBar.jsx";

const Homepage = () => {
    return (
        <div className="flex w-full h-[100vh]">
            <NavRight />
            <div className="flex-1">
                <h1>Homepage</h1>
                {/* Rest of the homepage content goes here */}
            </div>
        </div>
    );
};

export default Homepage;

import React from 'react';

const Homepage = () => {
    return (
        <div className="flex">
            <div className="bg-green-500 w-1/10 h-screen">
                {/* Sidebar content goes here */}
            </div>
            <div className="flex-1">
                <h1>Homepage</h1>
                {/* Rest of the homepage content goes here */}
            </div>
        </div>
    );
};

export default Homepage;

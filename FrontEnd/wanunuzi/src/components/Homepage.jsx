import React from 'react';
import NavRight from "./SideBar.jsx";
import NavBar from "./NavBar.jsx";

const Homepage = () => {
    return (
        <div className="flex w-full h-[100vh]">
            <NavRight />
            <div className="flex-1 bg-gray-200 p-4 flex flex-wrap justify-center items-center">
                <div className="w-[25%] h-[calc(80%/3)] bg-red-700 p-4 m-5">
                    <h2 className="text-white">Card 1</h2>
                </div>
                <div className="w-[25%] h-[calc(80%/3)] bg-red-700 p-4 m-5">
                    <h2 className="text-white">Card 2</h2>
                </div>
                <div className="w-[25%] h-[calc(80%/3)] bg-red-700 p-4 m-5">
                    <h2 className="text-white">Card 3</h2>
                </div>
                <div className="w-[25%] h-[calc(80%/3)] bg-red-700 p-4 m-5">
                    <h2 className="text-white">Card 4</h2>
                </div>
                <div className="w-[25%] h-[calc(80%/3)] bg-red-700 p-4 m-5">
                    <h2 className="text-white">Card 5</h2>
                </div>
                <div className="w-[25%] h-[calc(80%/3)] bg-red-700 p-4 m-5">
                    <h2 className="text-white">Card 6</h2>
                </div>
            </div>
        </div>
    );
};

export default Homepage;

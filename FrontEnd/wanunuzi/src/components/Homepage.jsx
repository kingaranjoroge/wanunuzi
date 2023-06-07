import React from 'react';
import NavRight from "./SideBar.jsx";
import NavBar from "./NavBar.jsx";

const cardData = [
    {
        icon: 'fa-wallet',
        text: 'Balance',
        moreText: '5000',
    },
    {
        icon: 'fa-circle-check',
        text: 'Loanable Amount',
        moreText: '3000',
    },
    {
        icon: 'fa-list-check',
        text: 'Manage Loans',
        moreText: 'Manage Loans here',
    },
    {
        icon: 'fa-money-bill-trend-up',
        text: 'Savings',
        moreText: '6000',
    },
    {

            icon: 'fa-landmark',
            text: 'Apply for loan',
            moreText: 'Apply for loan here',
    },
    {
            icon: 'fa-clock-rotate-left',
            text: 'History',
            moreText: 'Transaction History',
    }
];

const Homepage = () => {
    return (
        <div className="flex w-full h-full pt-16 pl-16">
            <NavRight />
            <div className="grid md:pt-28 md:pl-7 md:pr-5 grid-cols-1 w-full md:grid-cols-3 gap-10 justify-items-center h-full">
                {cardData.map((card, index) => (
                    <div key={index} className="w-10/12 h-36 p-4 rounded ring-2 ring-customGreen flex place-items-center justify-center align-middle flex-col">
                        <div className="text-5xl">
                            <i className={`fa ${card.icon}`} ></i>
                        </div>
                        <h2 className="text-white">{card.text}</h2>
                        <p className="text-white">{card.moreText}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;

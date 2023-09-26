import React from 'react';
import TestNav from "../navbar/testNav.jsx";
import config from "../../../Config.js";

const ChooseLoan = () => {
    return (
        <div className={'w-full overflow-clip'}>
            <TestNav />
           <h1 className={'items-center flex justify-center w-full text-3xl font-bold mt-12'}>Choose Loan Type</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 w-full overflow-clip gap-4">
                <div className="card lg:card-side bg-base-100 border-2 rounded-3xl shadow-sm">
                    <figure className={'h-full lg:w-1/2'}><img className={'h-full bg-cover'} src="/images/money.jpg" alt="Album"/></figure>
                    <div className="card-body p-3 md:p-5">
                        <h2 className="card-title">Normal Loan</h2>
                        <ul className="menu rounded m-0 p-1">
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Payment Duration">
                                    <i className="fa-solid fa-clock"></i>
                                    36 Months
                                </a>
                            </li>
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Maximum Amount">
                                    <i className="fa-solid fa-chart-line"></i>
                                    3 X Balance
                                </a>
                            </li>
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Stats">
                                    <i className="fa-solid fa-arrow-up-short-wide"></i>
                                    3.5% Interest
                                </a>
                            </li>
                        </ul>
                        <div className="card-actions justify-center items-center">
                            <a className={'w-full'} href={`${config.LIVE_URL}/normal-loan`}>
                                <button className="btn hover:bg-red-700 btn-outline rounded-3xl w-full ring-2 ring-customGreen ring-offset-2 ">Apply <i
                                    className="fa-solid fa-circle-check"></i></button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="card lg:card-side bg-base-100 border-2 rounded-3xl shadow-sm">
                    <figure className={'h-full lg:w-1/2'}><img className={'h-full bg-cover'} src="../../../public/images/cash.jpg" alt="Album"/></figure>
                    <div className="card-body p-3 md:p-5">
                        <h2 className="card-title">Emergency Loan</h2>
                        <ul className="menu rounded m-0 p-1">
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Payment Duration">
                                    <i className="fa-solid fa-clock"></i>
                                    12 Months
                                </a>
                            </li>
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Maximum Amount">
                                    <i className="fa-solid fa-chart-line"></i>
                                    2 X Balance
                                </a>
                            </li>
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Stats">
                                    <i className="fa-solid fa-arrow-up-short-wide"></i>
                                    3.5% Interest
                                </a>
                            </li>
                        </ul>
                        <div className="card-actions justify-end">
                            <a className={'w-full'} href={`${config.LIVE_URL}/emergency-loan`}>
                                <button className="btn hover:bg-red-700 btn-outline rounded-3xl w-full ring-2 ring-customGreen ring-offset-2 ">Apply <i
                                    className="fa-solid fa-circle-check"></i></button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="card lg:card-side bg-base-100 border-2 rounded-3xl shadow-sm">
                    <figure className={'h-full lg:w-1/2'}><img className={'h-full bg-cover'} src="../../../public/images/kenya.jpg" alt="Album"/></figure>
                    <div className="card-body p-3 md:p-5">
                        <h2 className="card-title">Investment Loan</h2>
                        <ul className="menu rounded m-0 p-1">
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Payment Duration">
                                    <i className="fa-solid fa-clock"></i>
                                    36 Months
                                </a>
                            </li>
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Maximum Amount">
                                    <i className="fa-solid fa-chart-line"></i>
                                    3 X Balance
                                </a>
                            </li>
                            <li>
                                <a className="tooltip m-0 py-3 px-1 flex gap-2" data-tip="Stats">
                                    <i className="fa-solid fa-arrow-up-short-wide"></i>
                                    3.5% Interest
                                </a>
                            </li>
                        </ul>
                        <div className="card-actions justify-end">
                            <a className={'w-full'} href={`${config.LIVE_URL}/investment-loan`}>
                                <button className="btn hover:bg-red-700 btn-outline rounded-3xl w-full ring-2 ring-customGreen ring-offset-2 ">Apply <i
                                    className="fa-solid fa-circle-check"></i></button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChooseLoan;

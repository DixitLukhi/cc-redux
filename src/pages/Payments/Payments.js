import React, { useEffect, useState } from 'react'
import CycleRequests from './CycleRequests';
import DepositRequests from './DepositRequests';
import Modal from '../../common/Modals/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import WithdrawRequests from './WithdrawRequests';
import { baseUrl } from '../../api/baseUrl';
import { useDispatch } from 'react-redux';
import { paymentRequestList } from './paymentSlice';

function Payments() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [paymentRequests, setPaymentRequests] = useState([]);
    const [isPayPopUpOpen, setIsPayPopUpOpen] = useState(false);
    const [payerData, setPayerData] = useState({});
    const [reload, setReload] = useState(false);
    let totalDueAmount = 0;
    let totalWithdrawAmount = 0;
    const [tab, setTab] = useState(location?.state?.paymentMethod ? (location?.state?.paymentMethod === "Deposit" ? 1 :
        location?.state?.paymentMethod === "Cycle" ? 2 : 3) : 1
    );
    const token = localStorage.getItem("Token");
    localStorage.removeItem("card_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("request_id");
    const header = {
        'Authorization': `Bearer ${token}`,
    }
    const getPaymentRequests = async () => {
        try {
            const response = await dispatch(paymentRequestList()).unwrap();
            // const response = await axios.get(`${baseUrl}/api/paymentRequest/payment-request-list`, { headers: header });
            if (response.data.IsSuccess) {
                setPaymentRequests(response.data.Data);
                setLoading(false);
            } else {
                toast.error("Something went wrong!!");
            }
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong!!");
            console.log(error);
            setLoading(false);
        }
    }


    paymentRequests.map((item) => {
        if (item.payment_method === "Deposit") {
            totalDueAmount += item.due_amount
        }
        if (item.payment_method === "Withdraw") {
            totalWithdrawAmount += item.due_amount
        }
        if (item.payment_method === "Cycle" && !item.cycle_deposit_status) {
            totalDueAmount += item.due_amount
        }

        if (item.payment_method === "Cycle" && item.cycle_deposit_status) {
            totalWithdrawAmount += item.due_amount
        }
    }
    );

    useEffect(() => {
        getPaymentRequests();

    }, [reload]);
    return (
        <>
            {
                loading ?
                    <div className="flex items-center justify-center pt-5">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                    </div> :
                    <div className="wrapper min-h-full">
                        <div className="relative flex flex-wrap items-center- justify-start mb-3 md:mb-[50px]">
                            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                                <div className="bg-[#e52b2b14] py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                                    <h2 className="text-[#E52B2B] mb-3">₹ {totalDueAmount}</h2>
                                    <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                                        Total Due Request Amount
                                    </span>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                                <div className="bg-[#F3F4F6] py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                                    <h2 className="text-darkGreen  mb-3">₹ {totalWithdrawAmount}</h2>
                                    <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                                        Total Withdraw Request Amount
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className="relative md:flex items-center justify-between mb-10">
                            <div className="flex w-full border-b-2 border-b-[#D7DFE9]">
                                <div className="ml-0 xsm:ml-8 md:ml-14 space-x-1">
                                    <button type="button" className={"inline-block font-extrabold text-sm sm:text-base px-3 sm:px-8 py-2 " + (tab === 1 ? "text-yankeesBlue  border-[#D7DFE9] rounded-tr-xl rounded-tl-xl translate-y-[2px] border-2 border-b-white" : "text-lightGray translate-y-[2px] border-transparent border-2")} data-tab="Deposit" onClick={() => setTab(1)}>Deposit Requests</button>
                                    <button type="button" className={"inline-block font-extrabold text-sm sm:text-base px-3 sm:px-8 py-2 " + (tab === 3 ? "text-yankeesBlue  border-[#D7DFE9] rounded-tr-xl rounded-tl-xl translate-y-[2px]  border-2 border-b-white" : "text-lightGray translate-y-[2px] border-transparent border-2")} data-tab="Withdraw" onClick={() => setTab(3)}>Withdraw Requests</button>
                                    <button type="button" className={"inline-block font-extrabold text-sm sm:text-base px-3 sm:px-8 py-2 " + (tab === 2 ? "text-yankeesBlue  border-[#D7DFE9] rounded-tr-xl rounded-tl-xl translate-y-[2px]  border-2 border-b-white" : "text-lightGray translate-y-[2px] border-transparent border-2")} data-tab="Cycle" onClick={() => setTab(2)}>Cycle Requests</button>
                                </div>
                            </div>
                        </div>
                        {tab === 1 && <DepositRequests paymentRequestData={paymentRequests} setReloade={setReload} />}
                        {tab === 2 && <CycleRequests paymentPaidData={paymentRequests} setReloade={setReload} />}
                        {tab === 3 && <WithdrawRequests WithdrawData={paymentRequests} setReloade={setReload} />}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </div >
            }
        </>

    )
}

export default Payments
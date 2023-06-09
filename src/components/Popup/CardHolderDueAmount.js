import { useFormik } from 'formik';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup';
import { baseUrl } from '../../api/baseUrl';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { addPaymentRequest } from '../../pages/Payments/paymentSlice';
function PaymentDetails({ handleClose, dueData }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();
    const header = {
        'Authorization': `Bearer ${token}`,
    }

    let minDateValue = new Date(new Date().setDate(new Date().getDate() + 1));

    const paymentMethod = [
        { name: 'Deposit', value: 'Deposit' },
        { name: 'Cycle', value: 'Cycle' },
        { name: 'Withdraw', value: 'Withdraw' },
    ];

    const initialState = {
        card_id: dueData.card_id,
        due_amount: "",
        due_date: '',
        payment_method: ''
    }

    const ValidationSchema = Yup.object().shape({
        due_amount: Yup.number().positive('Due Amount should be greater than 0*').required('Due amount is required*'),
        due_date: Yup.date().required('Due Date is required*'),
        payment_method: Yup.string().required('Payment Method is required*'),
    });

    const DueDateSend = async (values) => {
        setLoading(true);
        const requestObj = { ...values };
        try {
            const response = await dispatch(addPaymentRequest(requestObj)).unwrap();
            // const response = await axios.post(`${baseUrl}/api/paymentRequest/add-payment-request-byadmin`, requestObj, { headers: header });
            if (response.data.IsSuccess) {
                toast.success(response.data.Message);
                navigate("../../payment");
                handleClose(false);
            } else {
                toast.error(response.data.Message);
                console.log("error");
            }
            setLoading(false);
        } catch (error) {
            toast.error("Something Went Wrong.");
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: ValidationSchema,
        onSubmit: DueDateSend,
    });

    const setInputValue = useCallback(
        (key, value) =>
            formik.setValues({
                ...formik.values,
                [key]: value,
            }),
        [formik]
    );

    return (
        <div className="fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50">
            <div className="relative max-w-2xl h-auto w-full  m-auto bg-white rounded-lg md:rounded-3xl shadow-shadowbox p-5 sm:p-8">
                <button onClick={() => handleClose(false)} className="absolute top-1 right-1 md:top-5 md:right-5 text-xl max-[640px]:pl-6" >
                    <svg className="w-7 h-7" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Close"><rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"></rect><line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"></line><line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"></line></g></g></svg>
                </button>
                <h2 className='flex justify-center mb-7'>Add Due</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                        <div className='paymentpop w-full mb-3 md:mb-0'>
                            <label htmlFor="payment_method" className="input-title2">Payment method</label>
                            <Dropdown value={formik.values.payment_method} onChange={(e) => setInputValue("payment_method", e.target.value)} options={paymentMethod} optionLabel="name" placeholder="Select payment type" className="w-full overflow-hidden box-shadow" />
                            <small className="text-red-500 text-xs">{formik.errors.payment_method}</small>
                        </div>
                    </div>
                    <div className='w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7'>
                        <div className="w-full flex space-x-6">
                            <div className='paymentpop w-full md:w-1/2 mb-3 md:mb-0'>
                                <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Due Date</label>
                                <Calendar name="due_date" className='due w-full py-[1px] overflow-hidden box-shadow' minDate={minDateValue} placeholder={new Date().toISOString().slice(0, 10)} onChange={(e) => setInputValue("due_date", moment(e.target.value).toISOString().slice(0, 10))} readOnlyInput />
                                <small className="text-red-500 text-xs">{formik.errors.due_date}</small>
                            </div>
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Due Amount</label>
                                <input type="number" name="due_amount" value={formik.values.due_amount} onChange={(e) => setInputValue("due_amount", e.target.value)} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='$2,000' />
                                <small className="text-red-500 text-xs">{formik.errors.due_amount}</small>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex">
                        {loading ?
                            <button type="button" className="flex items-center justify-center btn-secondary w-full mt-5 sm:mt-0 cursor-not-allowed" disabled="">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </button>
                            :
                            <button type="submit" className="btn-secondary w-full">Add Due</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PaymentDetails
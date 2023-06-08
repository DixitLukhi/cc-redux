import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DemoImage from "../../assets/images/profile.png";
import axios from 'axios';
import { baseUrl } from '../../api/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import moment from 'moment/moment';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { getAllTransactions } from './transactionSlice';

export default function TransactionHistory() {

    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState([]);
    const token = localStorage.getItem("Token");
    const [loading, setLoading] = useState(true);
    localStorage.removeItem("card_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("request_id");

    const header = {
        'Authorization': `Bearer ${token}`,
    }
    const getTransactions = async () => {
        try {
            const response = await dispatch(getAllTransactions()).unwrap();
            // const response = await axios.get(`${baseUrl}/api/transaction/all-payment-record-list`, { headers: header });
            if (response.data.IsSuccess) {
                // toast.success(response.data.Message);
                setLoading(false);
                setTransaction(response.data.Data);
            } else {
                toast.error("Something went wrong!!");
            }
        } catch (error) {
            toast.error("Something went wrong!!");
            console.log(error);
        }
    }
    useEffect(() => {
        getTransactions();
    }, []);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        });
        setGlobalFilterValue('');
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className={"flex justify-between dataTables"}>
                <span className="p-input-icon-left bg-white">
                    <i className="pi pi-search" />
                    <InputText className='bg-white' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
                <div className='flex space-x-3 items-center'>
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" onClick={clearFilter} />
                </div>
            </div>
        );
    };
    const headerf = renderHeader();
    const columns = [
        {
            header: 'Payment To', field: (row) => {
                return <div className="flex">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={row?.user.profile_pic && row?.user.profile_pic !== "" ? row?.user.profile_pic : DemoImage} alt="" className='w-full h-full overflow-hidden' />
                    </div>
                    <div className="pl-4">
                        <span className="text-lg font-bold text-[#2D3643] block">{row.card.card_holder_name}</span>
                        <span className="text-sm text-yankeesBlue font-normal block">********{JSON.stringify((row.card.card_number)).slice(8)}</span>
                    </div>
                </div>
            },
        },
        {
            header: 'Payment Through', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {row.due_paid_through}
                </div>
            },
        },
        {
            header: 'Payment Date', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {moment(row.due_paid_at).format('ll')}
                </div>
            }
        },
        {
            header: 'Payment Time', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {moment(row.due_paid_at).format('LT')}
                </div>
            }
        },
        {
            header: 'Payment Amount', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    ₹ {row.paid_amount}
                </div>
            }
        },
        {
            header: 'Status', field: (row) => {
                return <>{row.payment_request.payment_status === false ? <div className="text-xs inline-block font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Unpaid</div> : <div className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">Paid</div>
                }
                </>
            }
        },
        {
            header: 'Payment Method', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">{row.payment_request.payment_method}</div>
                // <div className="text-xs font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Pending</div> //pending box
            }
        },
    ];

    return (
        <div className="wrapper min-h-full relative">
            <div className="flex items-center justify-between mb-5 sm:mb-10">
                <h3 className="text-yankeesBlue leading-8">Transaction History</h3>
            </div>
            {loading ?
                <div className="flex items-center justify-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
                :
                transaction.length > 0 ?
                    <DataTable value={transaction}
                        filters={filters}
                        globalFilterFields={['card.card_holder_name', 'card.card_number', 'card.card_bank_name', 'due_paid_through']}
                        header={headerf}
                        columnResizeMode={"expand"} resizableColumns={true} scrollable={true} paginator rows={5}>
                        {columns.map((col, i) => (

                            <Column key={col.field} field={col.field} header={col.header} />

                        ))}
                    </DataTable>
                    : "Transaction record not found."
            }
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
        </div>
    )
}

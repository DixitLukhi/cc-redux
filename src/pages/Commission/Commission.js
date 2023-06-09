import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DemoImage from "../../assets/images/profile.png"
import axios from 'axios';
import { baseUrl } from '../../api/baseUrl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { getProfitRecords } from './commissionSlice';

function Commission() {
    const dispatch = useDispatch();
    const [commission, setCommission] = useState([]);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    let totalEarningAmount = 0;
    const token = localStorage.getItem("Token");
    const header = {
        'Authorization': `Bearer ${token}`,
    }
    localStorage.removeItem("card_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("transaction_id");
    const getCommision = async () => {
        try {
            const response = await dispatch(getProfitRecords()).unwrap();
            // const response = await axios.get(`${baseUrl}/api/transaction/all-payment-record-list?payment_status=True`, { headers: header });
            if (response.data.IsSuccess) {
                setCommission(response.data.Data);
                setLoading(false);
            } else {
                toast.error("Something went wrong!!");
            }
        } catch (error) {
            toast.error("Something went wrong!!");
            console.log(error);
        }
    }
    commission.map((profit) => totalEarningAmount += profit.profit_amount);
    useEffect(() => {
        getCommision();
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
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                </div>
            </div>
        );
    };
    const headerf = renderHeader();
    const columns = [
        {
            header: 'Card Holder', field: (row) => {
                return <div className="flex items-center gap-2">
                    <div className='w-12 h-12 object-cover rounded-full overflow-hidden'>
                        <img alt="Demom Images" src={row?.user.profile_pic && row?.user.profile_pic !== "" ? row?.user.profile_pic : DemoImage} className='w-full h-full object-cover rounded-full overflow-hidden' />
                    </div>
                    <span className="text-lg font-bold text-[#2D3643] block">{row.card.card_holder_name}</span>
                </div>
            },
        },
        {
            header: 'Card Number', field: (row) => {
                return <div className="flex">
                    <span className="text-lg text-yankeesBlue font-semibold block">********{(row.card.card_number).toString().substr(-4)}</span>
                </div>
            },
        },
        {
            header: 'Due Amount', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    ₹ {row.payment_request.due_amount}
                </div>
            }
        },
        {
            header: 'Payment Method', field: (row) => {
                return <div className="flex">
                    <span className="text-lg text-yankeesBlue font-semibold block">{row.payment_request.payment_method}</span>
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
            header: 'Payment', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    ₹ {row.paid_amount}
                </div>
            }
        },

        {
            header: 'Profit (%)', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {row.profit ? row.profit + "%" : "-"}
                </div>
            }
        },
        {
            header: 'Charges', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    ₹ {row.deposit_charges + row.withdraw_charges}
                </div>
            }
        }, {
            header: 'Total Profit', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    ₹ {row.total_amount}
                </div>
            }
        },
        {
            header: 'Status', field: (row) => {
                return <>{row.profit_received === false ? <div className="text-xs inline-block font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Remain</div> : <div className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">"Received"</div>
                }</>
            }
        },
    ];

    return (
        <div className="wrapper min-h-full">
            <div className="relative flex flex-wrap items-center- justify-start md:mb-[50px]">
                <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                    <div className="bg-[#F3F4F6] py-7 px-7 2xl::px-11 rounded-xl h-full border border-transparent">
                        <h2 className="text-darkGreen mb-3">₹ {totalEarningAmount}</h2>
                        <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                            Total Earnings Amount
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                    <div className="bg-[#F3F4F6] py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                        <h2 className="text-yankeesBlue mb-3">₹ 0</h2>
                        <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                            Total Earnings Amount
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                    <div className="bg-[#F3F4F6] py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                        <h2 className="text-yankeesBlue mb-3">₹ 0</h2>
                        <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                            Earnings Pending
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mb-5 sm:mb-10 mt-4 md:mt-0">
                <h3 className="text-yankeesBlue leading-8">Profit History</h3></div>
            {loading ?
                <div className="flex items-center justify-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div> :
                commission.length > 0 ?
                    <DataTable value={commission} selectionMode="single"
                        filters={filters}
                        globalFilterFields={['card.card_holder_name', 'card.card_number', 'card.card_bank_name', 'due_date']}
                        header={headerf}
                        onSelectionChange={(col) => { localStorage.setItem("transaction_id", col.value.transaction_id); navigate("singleusercommissiondetails") }} columnResizeMode={"expand"} resizableColumns={true} scrollable={true} paginator rows={5}>
                        {columns.map((col, i) => (

                            <Column key={col.field} field={col.field} header={col.header} />

                        ))}
                    </DataTable>
                    : "Profit record not found."
            }

        </div>
    )
}

export default Commission
import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import CardBg from "../../assets/images/card.png";
import DemoImage from "../../assets/images/profile.png";
import creditCard from "../../assets/images/credit-card.png";
import moment from "moment/moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../../api/baseUrl";
import { ProgressSpinner } from "primereact/progressspinner";

function AdminDebitCards({ list }) {
  const [listDebitCard, setListDebitCard] = useState([]);
  let totalAvailableBalance = 0;
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("Token");

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const getDebitCards = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/cards/view-admin-card?card_type=Debit Card`,
        { headers: header }
      );
      if (response.data.IsSuccess) {
        setListDebitCard(response.data.Data);
        setLoading(false);
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(error);
    }
  };
  listDebitCard.map(
    (balance) => (totalAvailableBalance += balance.available_balance)
  );

  useEffect(() => {
    getDebitCards();
  }, []);

  const columns = [
    {
      header: "Holder Name",
      field: (row) => (
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={DemoImage}
              alt=""
              className="w-full h-full overflow-hidden"
            />
          </div>
          <div className="pl-4">
            <span className="text-lg font-bold text-[#2D3643] block">
              {row.card_holder_name}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Bank Name",
      field: (row) => {
        return (
          <div className="text-lg font-semibold text-yankeesBlue">
            {row.card_bank_name}
          </div>
        );
      },
    },
    {
      header: "Card Number",
      field: (row) => {
        return (
          <div className="text-lg font-semibold text-yankeesBlue">
            ********{row.card_number.toString().substr(-4)}
          </div>
        );
      },
    },
    {
      header: "Card Expiry",
      field: (row) => {
        return (
          <div className="text-lg font-semibold text-yankeesBlue">
            {moment(row.card_exp_date).format("ll")}
          </div>
        );
      },
    },
    {
      header: "Total Credit",
      field: (row) => {
        return (
          <div className="text-lg font-semibold text-[#E52B2B]">
            ₹ {row.available_balance}
          </div>
        );
      },
    },
  ];
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center pt-5">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <>
          <div className="wrapper min-h-full px-0">
            <div className="relative flex flex-wrap items-center- justify-start mt-3 sm:mt-5 md:mb-[50px]">
              <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                <div className="bg-lightWhite py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                  <h2 className="text-darkGreen mb-3">₹ {totalAvailableBalance}</h2>
                  <span className="text-[#64748B] text-xl font-semibold whitespace-nowrap">
                    Total Due Amount
                  </span>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                <div className="bg-lightWhite py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                  <h2 className="text-yankeesBlue mb-3">₹ 20,000</h2>
                  <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                    Total Unpaid Profit Amount
                  </span>
                </div>
              </div>
            </div>
            {!list ? (
              <>
                {/* List View  */}
                <div className="mt-9">
                  <DataTable value={listDebitCard} columnResizeMode={"expand"} resizableColumns={true} scrollable={true} paginator rows={5}>
                    {columns.map((col, i) => (
                      <Column
                        className="relative"
                        key={col.field}
                        field={col.field}
                        header={col.header}
                      />
                    ))}
                  </DataTable>
                </div>
              </>
            ) : (
              <>
                {/* Card View  */}
                <div className="flex justify-start flex-wrap mt-9">
                  {listDebitCard.length > 0 ? (
                    listDebitCard.map((card) => (
                      <div className="relative w-full md:w-1/2 xl:w-1/3 overflow-hidden sm:px-3 2xl:mb-4 mb-4">
                        <div className="bg-[#0F172A] rounded-2xl lg:rounded-[32px] overflow-hidden relative max-w-[412px] md:mr-auto mx-auto">
                          <img
                            src={CardBg}
                            alt="Credit card background"
                            className="w-full h-full object-cover absolute inset-0 object-right"
                          />
                          <div className="px-5 py-7 md:p-10 relative z-10">
                            <div className='flex items-center'>

                              <span className="text-lg text-white font-semibold pr-3">
                                {card.card_holder_name}
                              </span>
                              <svg width="40" height="13" viewBox="0 0 40 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.0367 12.8124L36.6617 10.9277H32.4717L31.805 12.799L28.4467 12.8057C30.0455 8.94109 31.6477 5.07794 33.2533 1.21624C33.5267 0.561211 34.0117 0.227836 34.7267 0.231186C35.2733 0.236212 36.165 0.236211 37.4033 0.232861L40 12.8073L37.0367 12.8124ZM33.415 8.34613H36.115L35.1067 3.62191L33.415 8.34613ZM11.7667 0.22951L15.1433 0.232861L9.92333 12.814L6.505 12.8107C5.64541 9.48752 4.79652 6.16156 3.95833 2.83286C3.79167 2.16946 3.46167 1.70541 2.82667 1.48595C2.26167 1.28995 1.32 0.988402 0 0.577964V0.234537H5.395C6.32833 0.234537 6.87333 0.688531 7.04833 1.61997C7.225 2.55309 7.66833 4.92861 8.38167 8.74652L11.7667 0.22951ZM19.7833 0.232861L17.1133 12.8107L13.9 12.8073L16.5667 0.22951L19.7833 0.232861ZM26.3 0C27.2617 0 28.4733 0.301547 29.17 0.577964L28.6067 3.18634C27.9767 2.9317 26.94 2.58827 26.0683 2.6C24.8017 2.62178 24.0183 3.15619 24.0183 3.66882C24.0183 4.50309 25.3783 4.92358 26.7783 5.83492C28.3767 6.87358 28.5867 7.8067 28.5667 8.82023C28.545 10.9244 26.7783 13 23.0517 13C21.3517 12.9749 20.7383 12.8308 19.3517 12.3366L19.9383 9.6143C21.35 10.209 21.9483 10.3983 23.155 10.3983C24.26 10.3983 25.2083 9.94936 25.2167 9.16701C25.2233 8.61082 24.8833 8.33441 23.6433 7.64755C22.4033 6.95902 20.6633 6.0058 20.6867 4.09265C20.715 1.64343 23.0233 0 26.3017 0H26.3Z" fill="white" />
                              </svg>
                            </div>

                            <div className="flex flex-col pt-3 lg:pt-6">
                              <span className="text-[#94A3B8] text-sm lg:text-base font-normal">
                                {card.card_bank_name}
                              </span>
                              <span className="text-white text-xl lg:text-2xl font-semibold">
                                ********{card.card_number.toString().substr(-4)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between pt-3 lg:pt-6">
                              <div className='flex flex-col'>
                                <span className="text-[#94A3B8] text-sm lg:text-base leading-7 font-normal">
                                  Total Credit
                                </span>
                                <span className="text-white text-xl lg:text-2xl font-semibold">
                                  ₹ {card.due_amount}{" "}
                                </span>
                              </div>
                              <div className='flex flex-col'>
                                <span className="text-[#94A3B8] text-sm lg:text-base leading-7 font-normal">
                                  Due Date
                                </span>
                                <span className="text-white text-xl lg:text-2xl font-semibold">
                                  29 Dec 2023
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center">
                      <div className="flex items-center justify-center flex-col">
                        <img
                          src={creditCard}
                          alt="Credit Card Images"
                          className="w-full h-full object-cover"
                        />
                        <span className="text-[#64748B] text-3xl font-normal pt-5">
                          Please add your cards
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
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
        </>
      )}{" "}
    </>
  );
}

export default AdminDebitCards;

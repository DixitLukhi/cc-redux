import { combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "../components/auth/authSlice";
import dashboardSlice from "../pages/Dashboard/dashboardSlice";
import adminSlice from "../pages/Admin/adminSlice";
import transactionSlice from "../pages/Transactions/transactionSlice";
import commissionSlice from "../pages/Commission/commissionSlice";
import cardHolderSlice from "../pages/Cardholder/cardHolderSlice";

const combineReducer = combineReducers({
    auth : authSlice,
    dashboard : dashboardSlice,
    admin : adminSlice,
    transaction : transactionSlice,
    commission : commissionSlice,
    cardHolder : cardHolderSlice
})

const store = configureStore({
    reducer : combineReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
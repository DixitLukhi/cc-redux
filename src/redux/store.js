import { combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "../components/auth/authSlice";
import dashboardSlice from "../pages/Dashboard/dashboardSlice";
import adminSlice from "../pages/Admin/adminSlice";

const combineReducer = combineReducers({
    auth : authSlice,
    dashboard : dashboardSlice,
    admin : adminSlice
})

const store = configureStore({
    reducer : combineReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
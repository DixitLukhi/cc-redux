import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allProfitRecords, profitRecordById } from "../../redux/services/paymentServices/commissionServices";

const initialState = {
    profitRecords: {}
}

export const getProfitRecords = createAsyncThunk("commission/getProfitrecords", async () => {
    return await allProfitRecords();
});

export const getProfitById = createAsyncThunk("commission/getProfitrecordById", async (transactionId) => {
    return await profitRecordById(transactionId);
});



const commissionSlice = createSlice({
    name: "commission",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfitRecords.fulfilled, (state, action) => {
            state.profitRecords = action?.payload?.data?.Data;
        })
    }
});

export default commissionSlice.reducer;

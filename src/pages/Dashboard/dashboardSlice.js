import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { barData, pieData } from "../../redux/services/paymentServices/dashboardServices";

const initialState = {
    barData: [],
    pieData: []
}

export const getBarData = createAsyncThunk(
    "dashboard/getBarData",
    async () => {
        return await barData();
    }
);

export const getPieData = createAsyncThunk("dashboard/getPieData", async () => {
    return await pieData();
});

const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBarData.fulfilled, (state, action) => {
            state.barData = action?.payload?.data?.Data;
        });
        builder.addCase(getPieData.fulfilled, (state, action) => {
            state.pieData = action?.payload?.data?.Data;
        })
    }
})

export default dashboardSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { invoice, paymentRecord, paymentRequest, paymentRequestByAdmin, paymentRequestByID } from "../../redux/services/paymentServices/paymentServices";

const initialState = {
    paymentList: []
}

export const addPaymentRequest = createAsyncThunk("payment/addPaymentRequest",
    async (paylad) => {
        return await paymentRequestByAdmin(paylad);
    }
)

export const paymentRequestList = createAsyncThunk("payment/paymentRequestList",
    async () => {
        return await paymentRequest();
    }
)

export const paymentRequestListById = createAsyncThunk("payment/paymentRequestList",
    async (requestId) => {
        return await paymentRequestByID(requestId);
    }
)

export const getInvoicePrint = createAsyncThunk("payment/getInvoice",
    async (requestId) => {
        return await invoice(requestId);
    }
)

export const addPaymentRecord = createAsyncThunk("payment/addPaymentRecord",
    async (payload) => {
        return await paymentRecord(payload);
    }
)

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(paymentRequestList.fulfilled, (state, action) => {
            state.paymentList = action?.payload?.data?.Data;
        })
    }
})

export default paymentSlice.reducer;
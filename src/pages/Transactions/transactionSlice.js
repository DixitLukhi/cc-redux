import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { allTransaction } from "../../redux/services/paymentServices/transactionServices";

const initialState = {
    transactionRecords : {}
}

export const getAllTransactions = createAsyncThunk( "transaction/getAllTransactions", 
    async () => {
        return await allTransaction();
    }
)

const transactionSlice = createSlice({
    name : "transaction",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase( getAllTransactions.fulfilled, (state, action) => {
            state.transactionRecords = action?.payload?.data?.Data;
        })
    }
})

export default transactionSlice.reducer;
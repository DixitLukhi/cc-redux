import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allCards } from "../../redux/services/paymentServices/cardservices";

const initialState = {
    cards: {}
}

export const getAllCards = createAsyncThunk("cards/getAllCards",
    async () => {
        return await allCards();
    }
)

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCards.fulfilled, (state, action) => {
            state.cards = action?.payload?.data?.Data;
        })
    }
})

export default cardsSlice.reducer;
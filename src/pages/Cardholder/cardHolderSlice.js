import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAccount, addUserCard, cardList, cardholders, deleteUser, editUser, editUserCard, paymentListById, userById, userCardById, verifyAccount } from "../../redux/services/paymentServices/cardHolderServices";

const initialState = {
    cardHolders: {},
    userVerify: false,
    cards: {}
}

export const getUserList = createAsyncThunk("cardholder/getCardholders",
    async () => {
        return await cardholders();
    }
)

export const getUser = createAsyncThunk("cardHolder/getUser",
    async (userId) => {
        return await userById(userId);
    }
)

export const getCards = createAsyncThunk("cardHolder/getCards",
    async (userId) => {
        return await cardList(userId);
    }
)

export const getUserCardById = createAsyncThunk("cardHolder/getUserCard",
    async (cardId) => {
        return await userCardById(cardId);
    }
)

export const getPaymentListById = createAsyncThunk("cardHolder/getPaymentListById",
    async (cardId) => {
        return await paymentListById(cardId);
    }
)

export const createAccount = createAsyncThunk("cardHolder/createAccount",
    async (payload) => {
        return await addAccount(payload);
    }
)

export const addCardUser = createAsyncThunk("cardHolder/addCard",
    async (payload) => {
        return await addUserCard(payload);
    }
)

export const editCardUser = createAsyncThunk("cardHolder/editCard",
    async (payload) => {
        return await editUserCard(payload);
    }
)

export const editAccount = createAsyncThunk("cardHolder/editAccount",
    async (payload) => {
        return await editUser(payload);
    }
)

export const verifyUser = createAsyncThunk("cardHolder/verifyAccount",
    async (payload) => {
        return await verifyAccount(payload);
    }
)

export const deleteUserByAdmin = createAsyncThunk("cardHolder/deleteuser",
    async (userId) => {
        return await deleteUser(userId);
    }
)

const cardHolderSlice = createSlice({
    name: "cardHolder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.cardHolders = action?.payload?.data?.Data;
        });
        builder.addCase(verifyUser.fulfilled, (state, action) => {
            state.userVerify = action?.payload?.data?.Data;
        });
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.cards = action?.payload?.data?.Data;
        });
    }
})

export default cardHolderSlice.reducer;
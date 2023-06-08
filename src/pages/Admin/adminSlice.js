import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { addCard, adminCard, adminCardById, deleteAdminCard, editCard, editProfileDetails, profile } from "../../redux/services/paymentServices/adminServices";

const initialState = {
    profileDetails: {},
    adminCards: []
}

export const getProfile = createAsyncThunk(
    "admin/getProfile",
    async () => {
        return await profile();
    }
);

export const editProfile = createAsyncThunk(
    "admin/editProfile",
    async (payload) => {
        return await editProfileDetails(payload);
    }
);

export const getAdminCards = createAsyncThunk(
    "admin/getAdminCards",
    async () => {
        return await adminCard();
    }
);

export const getAdminCardByID = createAsyncThunk(
    "admin/getAdminCardById",
    async (cardId) => {
        return await adminCardById(cardId);
    }
);

export const addAdminCard = createAsyncThunk(
    "admin/addAdminCard",
    async (payload) => {
        return await addCard(payload);
    }
);

export const editAdminCard = createAsyncThunk(
    "admin/editAdminCard",
    async (payload) => {
        return await editCard(payload);
    }
);

export const deleteCard = createAsyncThunk("admin/deleteCard",
    async (cardId) => {
        return await deleteAdminCard(cardId);
    })
const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profileDetails = action?.payload?.data?.Data;
        });
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state.profileDetails = action?.payload?.data?.Data;
        });
        builder.addCase(getAdminCards.fulfilled, (state, action) => {
            state.adminCards = action?.payload?.data?.Data;
        });
    }
})

export default adminSlice.reducer;

export const selectProfile = (state) => state.admin.profileDetails;

export const useProfile = () => {
    const profile = useSelector(selectProfile);
    return useMemo(() => profile, [profile]);
};
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { editProfileDetails, profile } from "../../redux/services/paymentServices/adminServices";

const initialState = {
    profileDetails: {},
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
        console.log("p : ", payload);
      return await editProfileDetails(payload);
    }
  );

const adminSlice = createSlice({
    name : "adminSlice",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            console.log("hi", action.payload);
            state.profileDetails = action?.payload?.data?.Data;
        });
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state.profileDetails = action?.payload?.data?.Data;
        });
    }
})

export default adminSlice.reducer;

export const selectProfile = (state) => state.admin.profileDetails;

export const useProfile = () => {
    const profile = useSelector(selectProfile);
    return useMemo(() => profile, [profile]);
};
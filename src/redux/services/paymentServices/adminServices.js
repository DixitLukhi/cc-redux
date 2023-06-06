import { EDIT_PROFILE, PROFILE } from "../../../api/constApi";
import authHeader, { imageHeader } from "../authHeader";
import { apiInstance } from "../axiosApi";

export const profile = () => {
    return apiInstance.get(PROFILE, { headers: authHeader() });
};

export const editProfileDetails = (payload) => {
    console.log( "ac : ", payload);
    return apiInstance.patch(EDIT_PROFILE, payload, { headers: imageHeader() });
};

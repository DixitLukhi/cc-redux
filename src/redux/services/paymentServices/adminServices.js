import { ADD_ADMIN_CARD, DELETE_ADMIN_CARD, EDIT_ADMIN_CARD, EDIT_PROFILE, PROFILE, VIEW_ADMIN_CARD, VIEW_ADMIN_CARD_BY_ID } from "../../../api/constApi";
import authHeader, { imageHeader } from "../authHeader";
import { apiInstance } from "../axiosApi";

export const profile = () => {
    return apiInstance.get(PROFILE, { headers: authHeader() });
};

export const editProfileDetails = (payload) => {
    console.log( "ac : ", payload);
    return apiInstance.patch(EDIT_PROFILE, payload, { headers: imageHeader() });
};

export const adminCard = () => {
    return apiInstance.get( VIEW_ADMIN_CARD, {headers: authHeader() });
}

export const adminCardById = (cardId) => {
    return apiInstance.get( `${VIEW_ADMIN_CARD_BY_ID}${cardId}`, {headers: authHeader() });
}

export const deleteAdminCard = (cardId) => {
    return apiInstance.delete( `${DELETE_ADMIN_CARD}${cardId}`, {headers: authHeader() });
}

export const editCard = (payload) => {
    return apiInstance.patch( EDIT_ADMIN_CARD, payload, {headers: imageHeader() });
}

export const addCard = (payload) => {
    return apiInstance.post( ADD_ADMIN_CARD, payload, {headers: imageHeader() });
}

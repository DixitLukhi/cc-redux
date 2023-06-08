import { ADD_USER_CARD, ADMIN_dELETE_USER, CARD_LIST, CREATE_ACCOUNT, EDIT_ACCOUNT, EDIT_USER_CARD, PAYMENT_REQUEST_LIST_BY_ID, USER_BY_ID, USER_CARD_BY_ID, USER_LIST, VERIFY_ACCOUNT } from "../../../api/constApi"
import authHeader, { imageHeader } from "../authHeader"
import { apiInstance } from "../axiosApi"

export const cardholders = () => {
    return apiInstance.get(USER_LIST, { headers: authHeader() });
}

export const userById = (userId) => {
    return apiInstance.get(`${USER_BY_ID}${userId}`, { headers: authHeader() });
}

export const cardList = (userId) => {
    return apiInstance.get(`${CARD_LIST}${userId}`, { headers: authHeader() });
}

export const addAccount = (payload) => {
    return apiInstance.post(CREATE_ACCOUNT, payload, { headers: imageHeader() });
}

export const addUserCard = (payload) => {
    return apiInstance.post(ADD_USER_CARD, payload, { headers: imageHeader() });
}

export const userCardById = (cardId) => {
    return apiInstance.get(`${USER_CARD_BY_ID}${cardId}`, { headers: authHeader() });
}

export const editUserCard = (payload) => {
    return apiInstance.patch(EDIT_USER_CARD, payload, { headers: imageHeader() });
}

export const verifyAccount = (payload) => {
    return apiInstance.post(VERIFY_ACCOUNT, payload, { headers: authHeader() });
}

export const editUser = (payload) => {
    return apiInstance.patch(EDIT_ACCOUNT, payload, { headers: authHeader() });
}

export const deleteUser = (userId) => {
    return apiInstance.delete(`${ADMIN_dELETE_USER}${userId}`, { headers: authHeader() });
}

export const paymentListById = (cardId) => {
    return apiInstance.get(`${PAYMENT_REQUEST_LIST_BY_ID}${cardId}`, { headers: authHeader() });
}


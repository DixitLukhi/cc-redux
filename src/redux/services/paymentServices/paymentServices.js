import { ADD_PAYMENT_RECORD, ALL_PAYMENT_RECORD_LIST, ALL_PAYMENT_RECORD_LIST_BY_ID, GET_INVOICE, PAYMENT_REQUEST_BY_ADMIN, PAYMENT_REQUEST_LIST } from "../../../api/constApi"
import authHeader from "../authHeader"
import { apiInstance } from "../axiosApi"

export const paymentRequestByAdmin = (payload) => {
    return apiInstance.post(PAYMENT_REQUEST_BY_ADMIN, payload, { headers: authHeader() });
}

export const paymentRequest = () => {
    return apiInstance.get(PAYMENT_REQUEST_LIST, { headers: authHeader() });
}

export const paymentRequestByID = (requestId) => {
    return apiInstance.get(`${ALL_PAYMENT_RECORD_LIST_BY_ID}${requestId}`, { headers: authHeader() });
}

export const invoice = (requestId) => {
    return apiInstance.get(`${GET_INVOICE}${requestId}`, { headers: authHeader() });
}

export const paymentRecord = (payload) => {
    return apiInstance.post(ADD_PAYMENT_RECORD, payload, { headers: authHeader() });
}

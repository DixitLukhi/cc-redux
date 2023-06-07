import { ALL_PAYMENT_RECORD_LIST } from "../../../api/constApi"
import authHeader from "../authHeader"
import { apiInstance } from "../axiosApi"

export const allTransaction = () => {
    return apiInstance.get( ALL_PAYMENT_RECORD_LIST, { headers: authHeader()});
}
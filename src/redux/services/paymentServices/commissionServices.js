import { ALL_PAYMENT_RECORD_LIST_TRUE, PROFIT_RECORD_BY_ID } from "../../../api/constApi"
import authHeader from "../authHeader"
import { apiInstance } from "../axiosApi"

export const allProfitRecords = () => {
    return apiInstance.get( ALL_PAYMENT_RECORD_LIST_TRUE, { headers: authHeader()});
}

export const profitRecordById = (transactionId) => {
    return apiInstance.get( `${PROFIT_RECORD_BY_ID}${transactionId}`, { headers: authHeader()});
}

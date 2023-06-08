import { CARDS_LIST } from "../../../api/constApi"
import authHeader from "../authHeader"
import { apiInstance } from "../axiosApi"

export const allCards = () => {
    return apiInstance.get(CARDS_LIST, { headers: authHeader() });
}
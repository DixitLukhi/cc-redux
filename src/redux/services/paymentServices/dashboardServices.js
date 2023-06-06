import { BAR_DATA, PIE_DATA } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const barData = () => {
    return apiInstance.get(BAR_DATA, { headers: authHeader() });
};

export const pieData = () => {
    return apiInstance.get(PIE_DATA, { headers: authHeader() });
};
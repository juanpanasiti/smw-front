import { transformPaymentFromAPI, transformPaymentToAPI } from "../helpers/transformApiDataHelpers";
import { PaymentRes } from "../types/apiTypes/payment";
import { Payment } from "../types/payments";
import apiClient from "./apiClient";


//! Payments
export const updatePaymentAPI = async (payment: Payment):Promise<Payment> => {
    const {data} = await apiClient.put<PaymentRes>(`/${payment.expenseId}/payments/${payment.id}`, transformPaymentToAPI(payment))
    return transformPaymentFromAPI(data)
}
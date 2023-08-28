import { transformPaymentFromAPI, transformPaymentToAPI } from "../helpers/transformApiDataHelpers";
import { PaymentRes } from "../types/apiTypes/payment";
import { Payment } from "../types/payments";
import apiClient from "./apiClient";


//! Payments
export const updatePaymentAPI = async (payment: Payment):Promise<Payment> => {
    const {data} = await apiClient.put<PaymentRes>(`/expenses/${payment.expenseId}/payments/${payment.id}`, transformPaymentToAPI(payment))
    return transformPaymentFromAPI(data)
}
export const createPaymentAPI = async (payment: Payment):Promise<Payment> => {
    const {data} = await apiClient.post<PaymentRes>(`/expenses/${payment.expenseId}/payments/`, transformPaymentToAPI(payment))
    return transformPaymentFromAPI(data)
}
import { transformCreditCardFromAPI, transformCreditCardToAPI } from '../helpers/transformApiDataHelpers';
import { CreditCardReq, CreditCardRes } from '../types/apiTypes/creditCard';
import { CreditCard } from '../types/creditCard';
import apiClient from './apiClient';

//! Credit Cards
export const getCreditCardsPaginatedAPI = async (page = 0, limit = 0): Promise<CreditCard[]> => {
    const params = {
        limit,
        offset: page * limit,
    };
    const { data } = await apiClient.get<CreditCardRes[]>('/credit_cards/', { params });
    return data.map(cc => transformCreditCardFromAPI(cc));
};
export const createCreditCardAPI = async (creditCard: CreditCard): Promise<CreditCard> => {
    const newCreditCard: CreditCardReq = transformCreditCardToAPI(creditCard)
    const { data } = await apiClient.post<CreditCardRes>('/credit_cards/', newCreditCard);
    return transformCreditCardFromAPI(data);
};
export const updateCreditCardAPI = async (creditCard: CreditCard): Promise<CreditCard> => {
    const updatedCreditCard: CreditCardReq = transformCreditCardToAPI(creditCard)
    const { data } = await apiClient.put<CreditCardRes>(`/credit_cards/${creditCard.id}`, updatedCreditCard);
    return transformCreditCardFromAPI(data);
};

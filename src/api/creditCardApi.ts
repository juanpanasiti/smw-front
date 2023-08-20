import { transformCreditCardFromAPI } from '../helpers/transformApiDataHelpers';
import { CreditCardRes } from '../types/apiTypes/creditCard';
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

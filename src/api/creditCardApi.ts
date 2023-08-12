import { transformCreditCardFromAPI, transformPurchaseFromAPI, transformStatementFromAPI, transformSubscriptionsFromAPI } from '../helpers/transformApiDataHelpers';
import { CreditCardRes } from '../types/apiTypes/creditCard';
import { PurchaseRes } from '../types/apiTypes/purchase';
import { StatementRes } from '../types/apiTypes/statement';
import { SubscriptionRes } from '../types/apiTypes/subscription';
import { CreditCard } from '../types/creditCard';
import { Purchase, Subscription } from '../types/expenses';
import { Statement } from '../types/statement';
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

//! CC - Purchases
export const getCCPurchasesPaginatedAPI = async (ccId: number, page = 0, limit = 0): Promise<Purchase[]> => {
    const params = {
        limit,
        offset: page * limit,
    };
    const { data } = await apiClient.get<PurchaseRes[]>(`/credit_cards/${ccId}/purchases/`, { params });
    return data.map(purchase => transformPurchaseFromAPI(purchase));
};

//! CC - Subscriptions
export const getCCSubscriptionsPaginatedAPI = async (ccId: number, page = 0, limit = 0): Promise<Subscription[]> => {
    const params = {
        limit,
        offset: page * limit,
    };
    const { data } = await apiClient.get<SubscriptionRes[]>(`/credit_cards/${ccId}/subscriptions/`, { params });
    return data.map(subscription => transformSubscriptionsFromAPI(subscription));
};

//! CC - Statements
export const getCCStatementsPaginatedAPI = async (ccId: number, page = 0, limit = 0): Promise<Statement[]> => {
    const params = {
        limit,
        offset: page * limit,
    };
    const { data } = await apiClient.get<StatementRes[]>(`/credit_cards/${ccId}/statements/`, { params });
    return data.map(purchase => transformStatementFromAPI(purchase));
};

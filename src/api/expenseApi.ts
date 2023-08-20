import { transformPurchaseFromAPI, transformPurchaseToAPI, transformSubscriptionFromAPI, transformSubscriptionToAPI } from '../helpers/transformApiDataHelpers';
import { PurchaseReq, PurchaseRes } from '../types/apiTypes/purchase';
import { SubscriptionRes } from '../types/apiTypes/subscription';
import { ExpenseFormData, Purchase, Subscription } from '../types/expenses';
import apiClient from './apiClient';

//! Purchases
export const getPurchasesPaginatedAPI = async (ccId: number, page = 0, limit = 0): Promise<Purchase[]> => {
    const params = {
        limit,
        offset: page * limit,
    };
    const { data } = await apiClient.get<PurchaseRes[]>(`/credit_cards/${ccId}/purchases/`, { params });
    return data.map(purchase => transformPurchaseFromAPI(purchase));
};
export const createPurchaseAPI = async (purchaseForm: ExpenseFormData): Promise<Purchase> => {
    const newPurchase: PurchaseReq = transformPurchaseToAPI(purchaseForm)
    const { data } = await apiClient.post<PurchaseRes>(`/credit_cards/${purchaseForm.creditCardId}/purchases/`, newPurchase);
    return transformPurchaseFromAPI(data);
};
export const updatePurchaseAPI = async (purchaseForm: ExpenseFormData): Promise<Purchase> => {
    const purchase: PurchaseReq = transformPurchaseToAPI(purchaseForm)
    const { data } = await apiClient.put<PurchaseRes>(`/credit_cards/${purchaseForm.creditCardId}/purchases/${purchaseForm.id}`, purchase);
    return transformPurchaseFromAPI(data);
};

//! Subscriptions
export const getSubscriptionsPaginatedAPI = async (ccId: number, page = 0, limit = 0): Promise<Subscription[]> => {
    const params = {
        limit,
        offset: page * limit,
    };
    const { data } = await apiClient.get<SubscriptionRes[]>(`/credit_cards/${ccId}/subscriptions/`, { params });
    return data.map(subscription => transformSubscriptionFromAPI(subscription));
};
export const createSubscriptionAPI = async (subscriptionForm: ExpenseFormData): Promise<Subscription> => {
    const newSubscription = transformSubscriptionToAPI(subscriptionForm)
    const { data } = await apiClient.post<SubscriptionRes>(`/credit_cards/${subscriptionForm.creditCardId}/subscriptions/`, newSubscription);
    return transformSubscriptionFromAPI(data);
};
export const updateSubscriptionAPI = async (subscriptionForm: ExpenseFormData): Promise<Subscription> => {
    const subscription = transformSubscriptionToAPI(subscriptionForm)
    const { data } = await apiClient.put<SubscriptionRes>(`/credit_cards/${subscriptionForm.creditCardId}/subscriptions/${subscriptionForm.id}`, subscription);
    return transformSubscriptionFromAPI(data);
};
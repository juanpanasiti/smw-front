import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CreditCardsState } from '../../../types/reducers';
import { CreditCard } from '../../../types/creditCard';

const initialState: CreditCardsState = {
    isLoading: false,
    creditCards: [],
};

export const creditCardSlice = createSlice({
    name: 'creditCards',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        stopLoading: state => {
            state.isLoading = false;
        },
        clearData: state => {
            state.isLoading = false;
            state.creditCards = [];
        },
        updateCreditCardList: ({ creditCards }, { payload }: PayloadAction<CreditCard>) => {
            const existingIndex = creditCards.findIndex(card => card.id === payload.id);
            if (existingIndex === -1) {
                creditCards.push(payload);
            } else {
                creditCards[existingIndex] = {
                    ...payload,
                    purchases: creditCards[existingIndex].purchases,
                    subscriptions: creditCards[existingIndex].subscriptions,
                    statements: creditCards[existingIndex].statements,
                };
            }
        },
        // addCCPurchase: ({ creditCards }, { payload }: PayloadAction<Purchase>) => {
        //     const creditCard = creditCards.find(cc => cc.id === payload.creditCardId);
        //     if (!creditCard) return;
        //     const existingIndex = creditCard.purchases.findIndex(purchase => purchase.id === payload.id);
        //     if (existingIndex === -1) {
        //         creditCard.purchases.push(payload);
        //     }
        // },
        // addCCSubscription: ({ creditCards }, { payload }: PayloadAction<Subscription>) => {
        //     const creditCard = creditCards.find(cc => cc.id === payload.creditCardId);
        //     if (!creditCard) return;
        //     const existingIndex = creditCard.subscriptions.findIndex(subscription => subscription.id === payload.id);
        //     if (existingIndex === -1) {
        //         creditCard.subscriptions.push(payload);
        //     }
        // },
        // addCCStatement: ({ creditCards }, { payload }: PayloadAction<Statement>) => {
        //     const creditCard = creditCards.find(cc => cc.id === payload.creditCardId);
        //     if (!creditCard) return;
        //     const existingIndex = creditCard.statements.findIndex(statement => statement.id === payload.id);
        //     if (existingIndex === -1) {
        //         creditCard.statements.push(payload);
        //     }
        // },
    },
});

export const { startLoading, stopLoading, clearData, updateCreditCardList } = creditCardSlice.actions;

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
                creditCards[existingIndex] = { ...payload };
            }
        },
    },
});

export const { startLoading, stopLoading, clearData, updateCreditCardList } = creditCardSlice.actions;

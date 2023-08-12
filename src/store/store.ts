import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/auth';
import { creditCardSlice } from './slices/credit_cards';

// TODO: Definir interface para store
export const store = configureStore({
    reducer: {
        authState: authSlice.reducer,
        creditCardsState: creditCardSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
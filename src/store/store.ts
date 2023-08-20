import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/auth';
import { creditCardSlice } from './slices/creditCards';
import { expenseSlice } from './slices/expenses';
import { messagesSlice } from './slices/messages/messageSlice';

export const store = configureStore({
    reducer: {
        authState: authSlice.reducer,
        creditCardsState: creditCardSlice.reducer,
        expensesState: expenseSlice.reducer,
        messagesState: messagesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

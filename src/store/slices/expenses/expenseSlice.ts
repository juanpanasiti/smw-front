import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ExpensesState } from '../../../types/reducers';
import { Expense } from '../../../types/expenses';
import { PaymentUpdated } from '../../../types/payments';

const initialState: ExpensesState = {
    isLoading: false,
    expenses: [],
};

export const expenseSlice = createSlice({
    name: 'expenses',
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
            state.expenses = [];
        },
        updateExpenseList: ({ expenses }, { payload }: PayloadAction<Expense>) => {
            const existingIndex = expenses.findIndex(expense => expense.id === payload.id);
            if (existingIndex === -1) {
                expenses.push(payload);
            } else {
                expenses[existingIndex] = {
                    ...payload,
                };
            }
        },
        updatePayment: ({ expenses }, { payload }: PayloadAction<PaymentUpdated>) => {
            const expense = expenses.find(exp => exp.id === payload.payment.expenseId)
            if (expense) {
                expense.payments = expense.payments.map(payment => {
                    if (payment.id === payload.paymentId) {
                        return payload.payment
                    }
                    return payment
                })
            }
        },
    },
});

export const { startLoading, stopLoading, clearData, updateExpenseList, updatePayment } = expenseSlice.actions;
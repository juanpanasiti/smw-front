import { createSelector } from 'reselect';
import { RootState } from '../store/store';
import { CreditCard } from '../types/creditCard';

// callbacks selectors
const selectExpenses = (state: RootState) => state.expensesState.expenses;
const getCreditCardId = (creditCard: CreditCard) => creditCard.id;

//! memorized selectors
// * select all expenses filtered by credit card
export const selectCreditCardExpenses = createSelector(selectExpenses, getCreditCardId, (expenses, creditCardId) =>
    expenses.filter(exp => exp.creditCardId === creditCardId),
);

//* select all active expenses
export const selectActiveExpenses = createSelector(selectExpenses, expenses =>
    expenses.filter(expense => expense.type === 'subscription' || expense.remainingInstallment > 0),
);

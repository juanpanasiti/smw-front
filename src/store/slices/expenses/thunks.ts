import { isAxiosError } from 'axios';
import { startLoading, stopLoading, updateExpenseList } from '.';
import { getPurchasesPaginatedAPI, getSubscriptionsPaginatedAPI } from '../../../api/expenseApi';
import { Status } from '../../../helpers/creditCardStatusHelpers';
import { CreditCard } from '../../../types/creditCard';
import { Expense, Purchase, Subscription } from '../../../types/expenses';
import { AppDispatch } from '../../store';
import { updateCreditCardList } from '../creditCards';
import { logoutUser } from '../auth';
import { purchseToExpenseItem, subscriptionToExpenseItem } from '../../../helpers/expensesHelpers';

export const getExpenseList = (creditCard: CreditCard) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoading());

            let page = 0;
            const limit = 50;

            // Update Purchases
            let purchasesPage: Purchase[] = [];
            do {
                purchasesPage = await getPurchasesPaginatedAPI(creditCard.id, page, limit);
                page++;
                purchasesPage.map(purchase => {
                    const expense: Expense = purchseToExpenseItem(creditCard, purchase);
                    dispatch(updateExpenseList(expense));
                });
            } while (purchasesPage.length === limit);

            // Update Subscriptions
            page = 0;
            let subscriptionsPage: Subscription[] = [];
            do {
                subscriptionsPage = await getSubscriptionsPaginatedAPI(creditCard.id, page, limit);
                page++;
                subscriptionsPage.map(subscription => {
                    const expense: Expense = subscriptionToExpenseItem(creditCard, subscription);
                    dispatch(updateExpenseList(expense));
                });
            } while (purchasesPage.length === limit);

            dispatch(
                updateCreditCardList({
                    ...creditCard,
                    status: Status.loaded,
                }),
            );
        } catch (error) {
            if (isAxiosError(error)) {
                dispatch(
                    updateCreditCardList({
                        ...creditCard,
                        status: Status.error,
                    }),
                );
                if (error.response?.status === 401) {
                    dispatch(logoutUser());
                    // dispatch(
                    //     addError({
                    //         id: Symbol(),
                    //         text: 'Expired token',
                    //     }),
                    // );
                }
                // } else if (isError(error)) {
                //     console.error('Error:', error.message);
            } else {
                console.error('Error desconocido:', error);
            }
        } finally {
            dispatch(stopLoading());
        }
    };
};

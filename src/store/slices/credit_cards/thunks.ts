import { isAxiosError } from 'axios';
import { addCCPurchase, updateCreditCardList, startLoading, stopLoading, addCCSubscription, addCCStatement } from '.';
import { getCCPurchasesPaginatedAPI, getCCStatementsPaginatedAPI, getCCSubscriptionsPaginatedAPI, getCreditCardsPaginatedAPI } from '../../../api/creditCardApi';
import { CreditCard } from '../../../types/creditCard';
import { AppDispatch } from '../../store';
import { logoutUser } from '../auth';
import { Purchase, Subscription } from '../../../types/expenses';
import { Status } from '../../../helpers/creditCardStatusHelpers';
import { Statement } from '../../../types/statement';

export const getCreditCardList = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoading());

            let page = 0;
            const limit = 50;
            let creditCardsPage: CreditCard[] = [];

            do {
                creditCardsPage = await getCreditCardsPaginatedAPI(page, limit);
                page++;
                creditCardsPage.map(cc => dispatch(updateCreditCardList(cc)));
            } while (creditCardsPage.length === limit);
        } catch (error) {
            if (isAxiosError(error)) {
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

export const getCCExpenses = (creditCard: CreditCard) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(updateCreditCardList({
                ...creditCard,
                status: Status.loading
            }));

            let page = 0;
            const limit = 50;
            
            // Update Purchases
            let purchasesPage: Purchase[] = [];
            do {
                purchasesPage = await getCCPurchasesPaginatedAPI(creditCard.id, page, limit);
                page++;
                purchasesPage.map(purchase => dispatch(addCCPurchase(purchase)));
            } while (purchasesPage.length === limit);
            
            // Update Subscriptions
            page = 0
            let subscriptionsPage: Subscription[] = [];
            do {
                subscriptionsPage = await getCCSubscriptionsPaginatedAPI(creditCard.id, page, limit);
                page++;
                subscriptionsPage.map(subscription => dispatch(addCCSubscription(subscription)));
            } while (purchasesPage.length === limit);
            
            // Update Statements
            page = 0
            let statementsPage: Statement[] = [];
            do {
                statementsPage = await getCCStatementsPaginatedAPI(creditCard.id, page, limit);
                page++;
                statementsPage.map(statement => dispatch(addCCStatement(statement)));
            } while (statementsPage.length === limit);

            dispatch(updateCreditCardList({
                ...creditCard,
                status: Status.loaded
            }));
        } catch (error) {
            if (isAxiosError(error)) {
                dispatch(updateCreditCardList({
                    ...creditCard,
                    status: Status.error
                }));
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

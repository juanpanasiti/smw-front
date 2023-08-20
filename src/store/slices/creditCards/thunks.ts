import { isAxiosError } from 'axios';
import { updateCreditCardList, startLoading, stopLoading } from '.';
import { getCreditCardsPaginatedAPI } from '../../../api/creditCardApi';
import { CreditCard } from '../../../types/creditCard';
import { AppDispatch } from '../../store';
import { logoutUser } from '../auth';

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



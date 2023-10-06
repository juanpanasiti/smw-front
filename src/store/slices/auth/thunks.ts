import { isAxiosError } from 'axios';
import { login, logout, setUserData, startLoading, stopLoading } from '.';
import { currentUserInfo, signIn } from '../../../api/authApi';
import { isError } from '../../../helpers/errorHelpers';
import { LoginRequest } from '../../../types/apiTypes/auth';
import { AppDispatch } from '../../store';
import { clearData as clearCreditCardsData } from '../creditCards';
import { clearData as clearExpensesData } from '../expenses';

export const loginUser = (userCredentials: LoginRequest) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoading());

            const token = await signIn(userCredentials);
            dispatch(getUserData(false));
            dispatch(login(token));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(stopLoading());
        }
    };
};

export const logoutUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem('token');
            dispatch(logout());
            dispatch(clearCreditCardsData())
            dispatch(clearExpensesData())
        } catch (error) {
            console.error(error);
        }
    };
};

export const loadStoredToken = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                dispatch(login(storedToken));
            }
        } catch (error) {
            console.error(error);
        }
    };
};

export const getUserData =
    (setLoadingStatus: boolean = true) =>
    async (dispatch: AppDispatch) => {
        try {
            setLoadingStatus && dispatch(startLoading());

            const userData = await currentUserInfo();
            dispatch(setUserData(userData));
        } catch (error) {
            if (isAxiosError(error)) {
                if (!error.response) {
                    throw error;
                }
                if (error.response.status === 401) {
                    dispatch(logoutUser());
                } else {
                    console.error('server error');
                }
            } else if (isError(error)) {
                console.warn('Error:', error.message);
            } else {
                console.warn('Error desconocido:', error);
            }
        } finally {
            setLoadingStatus && dispatch(stopLoading());
        }
    };

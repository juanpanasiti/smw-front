import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { UserProfile } from '../../../types/user';
import { AuthState } from '../../../types/reducers';
import { defaultUserProfile } from '../../../helpers/defaultValues';

const initialState: AuthState = {
    token: null,
    currentUser: { ...defaultUserProfile },
    isLoading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        stopLoading: state => {
            state.isLoading = false;
        },
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUserData: (state, action: PayloadAction<UserProfile>) => {
            state.currentUser = action.payload;
        },
        logout: state => {
            state.token = null;
            state.currentUser = { ...defaultUserProfile };
        },
    },
});

export const { startLoading, stopLoading, setUserData, login, logout } = authSlice.actions;

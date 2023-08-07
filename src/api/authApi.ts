import { LoginRequest, LoginResponse } from "../types/apiTypes/auth";
import { UserInfoResponse } from "../types/apiTypes/user";
import apiClient from "./apiClient";

export const signIn = async (userCredentials: LoginRequest): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('username', userCredentials.username);
        formData.append('password', userCredentials.password);

        localStorage.removeItem('token');
        const { data } = await apiClient.post<LoginResponse>('/auth/login', formData);
        localStorage.setItem('token', data.access_token);
        return data.access_token;
    } catch (error) {
        console.error(error);
        throw new Error('Error on login');
    }
};

export const currentUserInfo = async (): Promise<UserInfoResponse> => {
    try {
        const { data } = await apiClient.get<UserInfoResponse>('/auth/info');
        return data
    } catch (error) {
        console.error(error);
        throw new Error('Error on login');
    }
};

import { Role } from "../../helpers/roleHelpers";

export interface UserInfoResponse {
    id: number,
    username: string,
    email: string,
    role: Role,
}

export interface RegisterUser {
    username: string
    password: string
    email: string
}
import { Role } from "../helpers/roleHelpers";

export interface UserProfile {
    id: number,
    username: string,
    email: string,
    role: Role,
}
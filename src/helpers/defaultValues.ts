import { UserProfile } from "../types/user";
import { Role } from "./roleHelpers";

export const defaultUserProfile: UserProfile = {
    id: 0,
    username: '',
    email: '',
    role: Role.common,
}
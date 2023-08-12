import { CreditCard } from './creditCard';
import { Message } from './message';
import { UserProfile } from './user';

//! AUTH
export interface AuthState {
    token: string | null;
    currentUser: UserProfile;
    isLoading: boolean;
}

//! MESSAGES
export interface MessagesState {
    errors: Message[];
    warnings: Message[];
    info: Message[];
    success: Message[];
}

//! CREDIT CARDS
export interface CreditCardsState {
    isLoading: boolean;
    creditCards: CreditCard[]
}

// //! USERS
// export interface UsersState {
//     isLoading: boolean;
//     current;
// }

// //! PURCHASES
// export interface PurchasesState {
//     isLoading: boolean;
//     current;
// }

// //! SUBSCRIPTIONS
// export interface SubscriptionsState {
//     isLoading: boolean;
//     current;
// }

// //! STATEMENTS
// export interface StatementsState {
//     isLoading: boolean;
//     current;
// }

// //! INSTALLMENTS
// export interface InstallmentsState {
//     isLoading: boolean;
//     current;
// }

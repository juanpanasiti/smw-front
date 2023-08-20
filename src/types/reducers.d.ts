import { CreditCard } from './creditCard';
import { Expense } from './expenses';
import { Message } from './message';
import { Payment } from './payments';
import { UserProfile } from './user';

//! AUTH
export interface AuthState {
    token: string | null;
    currentUser: UserProfile;
    isLoading: boolean;
}

//! MESSAGES
export interface MessagesState {
    messages: Message[];
}

//! CREDIT CARDS
export interface CreditCardsState {
    isLoading: boolean;
    creditCards: CreditCard[]
}

//! EXPENSES
export interface ExpensesState {
    isLoading: boolean;
    expenses: Expense[];
}

//! PAYMENTS
export interface PaymentState {
    isLoading: boolean;
    payments: Payment[];
}

// //! USERS
// export interface UsersState {
//     isLoading: boolean;
//     current;
// }




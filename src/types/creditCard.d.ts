import { Status } from '../helpers/creditCardStatusHelpers';

export interface CreditCard {
    status: Status;
    id: number;
    mainCreditCardId?: number;
    name: string;
    limit: number;
    userId: number;
}

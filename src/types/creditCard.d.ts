import { Status } from '../helpers/creditCardStatusHelpers';
import { Purchase, Subscription } from './expenses';
import { Statement } from './statement';

export interface CreditCard {
    status: Status;
    id: number;
    mainCreditCardId?: number;
    name: string;
    limit: number;
    purchases: Purchase[];
    subscriptions: Subscription[];
    statements: Statement[];
}

import { Purchase, Subscription } from './expenses';
import { Statement } from './statement';

export interface CreditCard {
    id: number;
    mainCreditCardId?: number;
    name: number;
    limit: number;
    purchases: Purchase[];
    subscriptions: Subscription[];
    statements: Statement[];
}

import { CreditCardRes } from '../types/apiTypes/creditCard';
import { PurchaseRes } from '../types/apiTypes/purchase';
import { StatementRes } from '../types/apiTypes/statement';
import { SubscriptionRes } from '../types/apiTypes/subscription';
import { CreditCard } from '../types/creditCard';
import { Purchase, Subscription } from '../types/expenses';
import { Statement } from '../types/statement';
import { Status } from './creditCardStatusHelpers';

export const transformCreditCardFromAPI = (apiData: CreditCardRes): CreditCard => {
    const transformedData: CreditCard = {
        status: Status.notLoaded,
        id: apiData.id,
        name: apiData.name,
        limit: apiData.limit,
        purchases: [],
        subscriptions: [],
        statements: [],
    };
    if (apiData.main_credit_card_id) {
        transformedData.mainCreditCardId = apiData.main_credit_card_id;
    }
    return transformedData;
};

export const transformPurchaseFromAPI = (apiData: PurchaseRes): Purchase => {
    const transformedData: Purchase = {
        id: apiData.id,
        creditCardId: apiData.credit_card_id,
        title: apiData.title,
        ccName: apiData.cc_name,
        totalAmount: apiData.total_amount,
        totalInstallments: apiData.total_installments,
        purchasedAt: apiData.purchased_at,
    };
    return transformedData;
};

export const transformSubscriptionsFromAPI = (apiData: SubscriptionRes): Subscription => {
    const transformedData: Subscription = {
        id: apiData.id,
        creditCardId: apiData.credit_card_id,
        title: apiData.title,
        ccName: apiData.cc_name,
        totalAmount: apiData.total_amount,
        purchasedAt: apiData.purchased_at,
        isActive: apiData.is_active,
    };
    return transformedData;
};

export const transformStatementFromAPI = (apiData: StatementRes): Statement => {
    const transformedData: Statement = {
        id: apiData.id,
        creditCardId: apiData.credit_card_id,
        dateFrom: apiData.date_from,
        dateTo: apiData.date_to,
        expirationDate: apiData.expiration_date,
        period: apiData.period,
        items: apiData.items.map(item => ({
            id: item.id,
            statementId: apiData.id,
            amount: item.amount,
            installmentNo: item.installment_no,
            isConfirmed: item.is_confirmed,
        })),
    };
    return transformedData;
};

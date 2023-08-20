import { CreditCardRes } from '../types/apiTypes/creditCard';
import { PaymentReq, PaymentRes } from '../types/apiTypes/payment';
import { PurchaseReq, PurchaseRes } from '../types/apiTypes/purchase';
import { SubscriptionReq, SubscriptionRes } from '../types/apiTypes/subscription';
import { CreditCard } from '../types/creditCard';
import { ExpenseFormData, Purchase, Subscription } from '../types/expenses';
import { Payment } from '../types/payments';
import { Status } from './creditCardStatusHelpers';

export const transformCreditCardFromAPI = (apiData: CreditCardRes): CreditCard => {
    const transformedData: CreditCard = {
        status: Status.notLoaded,
        id: apiData.id,
        name: apiData.name,
        limit: apiData.limit,
    };
    if (apiData.main_credit_card_id) {
        transformedData.mainCreditCardId = apiData.main_credit_card_id;
    }
    return transformedData;
};

export const transformPurchaseFromAPI = (apiData: PurchaseRes): Purchase => {
    const apiPayments = apiData.payments || [];
    const transformedData: Purchase = {
        id: apiData.id,
        creditCardId: apiData.credit_card_id,
        title: apiData.title,
        ccName: apiData.cc_name,
        totalAmount: apiData.total_amount,
        totalInstallments: apiData.total_installments,
        purchasedAt: apiData.purchased_at,
        payments: apiPayments.map(payment => transformPaymentFromAPI(payment)),
    };
    return transformedData;
};
export const transformPurchaseToAPI = (data: ExpenseFormData): PurchaseReq => {
    const transformedData: PurchaseReq = {
        title: data.title,
        cc_name: data.ccName,
        total_amount: data.totalAmount,
        total_installments: data.totalInstallments,
        purchased_at: data.purchasedAt,
        credit_card_id: data.creditCardId,
    };
    if (data.firstInstallment) {
        transformedData.first_installment = data.firstInstallment;
    }
    return transformedData;
};

export const transformSubscriptionFromAPI = (apiData: SubscriptionRes): Subscription => {
    const apiPayments = apiData.payments || [];
    const transformedData: Subscription = {
        id: apiData.id,
        creditCardId: apiData.credit_card_id,
        title: apiData.title,
        ccName: apiData.cc_name,
        totalAmount: apiData.total_amount,
        purchasedAt: apiData.purchased_at,
        isActive: apiData.is_active,
        payments: apiPayments.map(payment => transformPaymentFromAPI(payment)),
    };
    return transformedData;
};
export const transformSubscriptionToAPI = (data: ExpenseFormData): SubscriptionReq => {
    const transformedData: SubscriptionReq = {
        title: data.title,
        cc_name: data.ccName,
        total_amount: data.totalAmount,
        purchased_at: data.purchasedAt,
        credit_card_id: data.creditCardId,
        is_active: data.isActive,
    };
    
    return transformedData;
};

export const transformPaymentFromAPI = (apiData: PaymentRes): Payment => {
    const transformedData: Payment = {
        id: apiData.id,
        number: apiData.number,
        expenseId: apiData.expense_id,
        status: apiData.status,
        amount: apiData.amount,
        month: apiData.month,
        year: apiData.year,
    };
    return transformedData;
};
export const transformPaymentToAPI = (data: Payment): PaymentReq => {
    const transformedData: PaymentReq = {
        number: data.number,
        expense_id: data.expenseId,
        status: data.status,
        amount: data.amount,
        month: data.month,
        year: data.year,
    };
    return transformedData;
};

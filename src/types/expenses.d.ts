import { Payment } from './payments';

export interface Purchase {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    totalAmount: number;
    totalInstallments: number;
    purchasedAt: string;
    payments: Payment[];
}

export interface Subscription {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    totalAmount: number;
    purchasedAt: string;
    isActive: boolean;
    payments: Payment[];
}

export interface Expense {
    id: number;
    title: string;
    type: 'purchase' | 'subscription';
    ccName: string;
    creditCardId: number;
    creditCardName: string;
    totalAmount: number;
    remainingAmount: number | '---';
    totalInstallments: number;
    remainingInstallment: number;
    purchasedAt: string;
    isActive: boolean;
    payments: Payment[];
}

export interface ExpenseFormData {
    id: number;
    type: 'purchase' | 'subscription';
    title: string;
    ccName: string;
    totalAmount: number;
    purchasedAt: string;
    totalInstallments: number;
    firstInstallment: string;
    isActive: boolean;
    creditCardId: number;
}

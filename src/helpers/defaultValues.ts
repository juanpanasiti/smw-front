import { Expense } from '../types/expenses';
import { Payment, Period, PeriodsByValidity } from '../types/payments';
import { UserProfile } from '../types/user';
import { Role } from './roleHelpers';

export const defaultUserProfile: UserProfile = {
    id: 0,
    username: '',
    email: '',
    role: Role.common,
};

export const defaultExpense: Expense = {
    id: 0,
    title: '',
    ccName: '',
    creditCardId: 0,
    creditCardName: '',
    type: 'purchase',
    totalAmount: 0,
    remainingAmount: 0,
    totalInstallments: 0,
    remainingInstallment: 0,
    purchasedAt: '',
    isActive: true,
    payments: [],
};

export const defaultPeriod: Period = {
    name: '',
    payments: [],
};

export const defaultPayment: Payment = {
    id: 0,
    amount: 0,
    expenseId: 0,
    month: 0,
    year: 0,
    number: 0,
    status: 'unconfirmed',
};

export const defaultGroupedPeriods: PeriodsByValidity = {
    current: {...defaultPeriod},
    next: [],
    previus: [],
}
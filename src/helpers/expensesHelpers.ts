import { CreditCard } from '../types/creditCard';
import { Expense, ExpenseFormData, Purchase, Subscription } from '../types/expenses';
import { Payment, Period, PeriodsByValidity } from '../types/payments';
import { compareMonthYear, formatDateToMonthYear, formatDateToYearMonthDay, getFirstDayOfMonth } from './dateHelpers';
import { defaultPeriod } from './defaultValues';
import { getId } from './messageHelpers';

export const purchseToExpenseItem = (creditCard: CreditCard, purchase: Purchase): Expense => {
    // const paidAmount = getPaidAmount(creditCard.statements, purchase.id);
    return {
        id: purchase.id,
        title: purchase.title,
        type: 'purchase',
        ccName: purchase.ccName,
        creditCardId: creditCard.id,
        creditCardName: creditCard.name,
        totalAmount: purchase.totalAmount,
        remainingAmount: purchase.totalAmount,
        totalInstallments: purchase.totalInstallments,
        remainingInstallment: 0, // TODO
        purchasedAt: purchase.purchasedAt,
        isActive: true, // Todo
        payments: purchase.payments,
    };
};
export const subscriptionToExpenseItem = (creditCard: CreditCard, subscription: Subscription): Expense => {
    // const paidAmount = getPaidAmount(creditCard.statements, purchase.id);
    return {
        id: subscription.id,
        title: subscription.title,
        type: 'subscription',
        ccName: subscription.ccName,
        creditCardId: creditCard.id,
        creditCardName: creditCard.name,
        totalAmount: subscription.totalAmount,
        remainingAmount: subscription.totalAmount,
        totalInstallments: -1,
        remainingInstallment: 0, // TODO
        purchasedAt: subscription.purchasedAt,
        isActive: true, // Todo
        payments: subscription.payments,
    };
};

export const getPaymentsFromExpenses = (expenses: Expense[]): Payment[] => {
    const payments: Payment[] = [];
    expenses.map(expense => payments.push(...expense.payments));
    return payments;
};

export const groupByPeriod = (payments: Payment[], subscriptions: Expense[]): Period[] => {
    const periods: Period[] = [];

    payments.map(payment => {
        const paymentDate = getFirstDayOfMonth(payment.year, payment.month);
        const periodName = formatDateToMonthYear(paymentDate);
        const paymentPeriod = periods.find(period => period.name === periodName);
        if (paymentPeriod) {
            paymentPeriod.payments.push(payment);
        } else {
            periods.push({
                name: periodName,
                payments: [payment],
            });
        }
    });
    periods.map(period => {
        subscriptions.map(sub => {
            const payment = period.payments.find(payment => payment.expenseId === sub.id);
            if (!payment) {
                const [month, year] = period.name.split('/').map(Number);
                period.payments.push({
                    id: getId(),
                    amount: sub.totalAmount,
                    month,
                    year,
                    expenseId: sub.id,
                    number: 0,
                    status: 'simulated',
                });
            }
        });
    });
    return periods;
};

export const groupPayments = (periods: Period[]): PeriodsByValidity => {
    const response: PeriodsByValidity = {
        next: [],
        previus: [],
        current: { ...defaultPeriod },
    };

    periods.map(period => {
        switch (compareMonthYear(period.name)) {
            case -1:
                response.previus.push(period);
                return;
            case 0:
                response.current = period;
                return;
            case 1:
                response.next.push(period);
                return;
            default:
                return;
        }
    });
    return response;
};

export const expenseToForm = (expense: Expense): ExpenseFormData => {
    const formData: ExpenseFormData = {
        id: expense.id,
        type: expense.type,
        title: expense.title,
        ccName: expense.ccName,
        totalAmount: expense.totalAmount,
        purchasedAt: expense.purchasedAt,
        totalInstallments: expense.totalInstallments,
        firstInstallment: '',
        isActive: expense.isActive,
        creditCardId: expense.creditCardId,
    };

    if (formData.id === 0) {
        const today = new Date();
        today.setMonth(today.getMonth());
        formData.purchasedAt = formatDateToYearMonthDay(today);
        formData.firstInstallment = formatDateToYearMonthDay(getFirstDayOfMonth(today.getFullYear(), today.getMonth() + 2));
        formData.totalInstallments = 1;
        formData.type = 'purchase';
    }

    return formData;
};

export const calcPaymentsSum = (payments: Payment[]): number => {
    return payments.reduce<number>((subtotal, payment) => subtotal + payment.amount, 0);
};

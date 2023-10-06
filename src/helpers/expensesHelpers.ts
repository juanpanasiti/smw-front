import { CreditCard } from '../types/creditCard';
import { Expense, ExpenseFormData, Purchase, Subscription } from '../types/expenses';
import { Payment, Period, PeriodStatus, PeriodsByValidity } from '../types/payments';
import { formatDateToMonthYear, formatDateToYearMonthDay, getFirstDayOfMonth, sortByDate } from './dateHelpers';
import { defaultPeriod } from './defaultValues';
import { getId } from './messageHelpers';

export const purchseToExpenseItem = (creditCard: CreditCard, purchase: Purchase): Expense => {
    // const paidAmount = getPaidAmount(creditCard.statements, purchase.id);
    const remainingAmount = purchase.totalAmount - purchase.payments.reduce((sum, payment) => (payment.status == 'paid' ? sum + payment.amount : sum), 0);
    const remainingInstallment = purchase.totalInstallments - purchase.payments.reduce((sum, payment) => (payment.status == 'paid' ? sum + 1 : sum), 0);
    return {
        id: purchase.id,
        title: purchase.title,
        type: 'purchase',
        ccName: purchase.ccName,
        creditCardId: creditCard.id,
        creditCardName: creditCard.name,
        totalAmount: purchase.totalAmount,
        remainingAmount: remainingAmount,
        totalInstallments: purchase.totalInstallments,
        remainingInstallment: remainingInstallment,
        purchasedAt: purchase.purchasedAt,
        isActive: remainingInstallment !== 0,
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

    payments.forEach(payment => {
        const paymentDate = getFirstDayOfMonth(payment.year, payment.month);
        const periodName = formatDateToMonthYear(paymentDate);
        const paymentPeriod = periods.find(period => period.name === periodName);
        if (paymentPeriod) {
            paymentPeriod.payments.push(payment);
        } else {
            periods.push({
                name: periodName,
                status: 'open',
                payments: [payment],
            });
        }
    });
    periods.forEach(period => {
        subscriptions.forEach(sub => {
            const payment = period.payments.find(payment => payment.status !== 'simulated' && payment.expenseId === sub.id);
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
    periods.forEach(period => {
        period.status = getPeriodStatus(period.payments)
    });
    return periods;
};

export const groupPayments = (periods: Period[]): PeriodsByValidity => {
    const previusPeriods: Period[] = [];
    let currentPeriod: Period = {...defaultPeriod}
    const nextPeriods: Period[] = [];

    periods.sort(sortByDate);
    periods.forEach(period => {
        switch (period.status) {
            case 'paid':
                previusPeriods.push(period);
                return;
            case 'closed':
            case 'open':
                if(currentPeriod.name === ''){
                    currentPeriod = period;
                } else {
                    nextPeriods.push(period);
                }
                return;
            default:
                return;
        }
    });
    return {
        previus: previusPeriods,
        current: currentPeriod,
        next: nextPeriods,
    };
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

export const findExpense = (expenses: Expense[], payment: Payment): Expense | undefined => {
    return expenses.find(expense => expense.id === payment.expenseId);
};

export const getPeriodStatus = (payments: Payment[]): PeriodStatus => {
    if (payments.length === 0) {
        return 'closed';
    }
    if (payments.some(payment => payment.status === 'unconfirmed' || payment.status === 'simulated')) {
        return 'open';
    }
    if (payments.some(payment => payment.status === 'paid' || payment.status === 'canceled')) {
        return 'paid';
    }
    return 'closed';

}
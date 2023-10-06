export interface Payment {
    id: number;
    expenseId: number;
    status: Status;
    number: number;
    month: number;
    year: number;
    amount: number;
}

export interface PaymentUpdated {
    paymentId: number;
    payment: Payment;
}

export type PeriodStatus =  'open' | 'closed' | 'paid'
export interface Period {
    name: string;
    status: PeriodStatus
    payments: Payment[];
}

export interface PeriodsByValidity {
    current: Period;
    previus: Period[];
    next: Period[];
}

export interface PeriodDataSet {
    name: string;
    totalAmount: number;
}

export type Status = 'unconfirmed' | 'confirmed' | 'paid' | 'canceled' | 'simulated';

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

export interface Period {
    name: string;
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

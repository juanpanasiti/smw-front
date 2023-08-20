export interface Payment {
    id: number;
    expenseId: number;
    status: Status;
    number: number;
    month: number;
    year: number;
    amount: number;
}

export interface Period {
    name: string;
    payments: Payment[];
}

export interface PeriodsByValidity {
    current: Period;
    previus: Periods[];
    next: Periods[];
}

export type Status = 'unconfirmed' | 'confirmed' | 'paid' | 'canceled';

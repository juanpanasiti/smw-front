export interface StatementReq {
    date_from: string;
    date_to: string;
    expiration_date: string;
    credit_card_id: number;
}

export interface StatementRes {
    id: number;
    credit_card_id: number;
    date_from: string;
    date_to: string;
    expiration_date: string;
    period: string;
    items: Item[];
    created_at: string;
    updated_at: string;
}

export interface Item {
    id: number;
    amount: number;
    installment_no: number;
    is_confirmed: boolean;
    created_at: string;
    updated_at: string;
}

export interface StatementItemReq {
    installment_no: number;
    cc_statement_id: number;
    amount: number;
    cc_expense_id: number;
}

export interface StatementItemRes {
    id: number;
    amount: number;
    is_confirmed: boolean;
    installment_no: number;
    created_at: string;
    updated_at: string;
}
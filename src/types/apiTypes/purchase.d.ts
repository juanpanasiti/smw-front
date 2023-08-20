import { PaymentRes } from "./payment";

export interface PurchaseReq {
    title: string;
    cc_name: string;
    total_amount: number;
    total_installments: number;
    purchased_at: string;
    credit_card_id: number;
    first_installment?: string
}

export interface PurchaseRes {
    id: number;
    title: string;
    cc_name: string;
    total_amount: number;
    total_installments: number;
    purchased_at: string;
    credit_card_id: number;
    created_at: string;
    updated_at: string;
    payments: PaymentRes[];
}

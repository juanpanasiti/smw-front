export interface PurchaseReq {
    title: string;
    cc_name: string;
    total_amount: string;
    total_installments: string;
    purchased_at: string;
    credit_card_id: number;
}

export interface PurchaseRes {
    id: number;
    title: string;
    cc_name: string;
    total_amount: string;
    total_installments: string;
    purchased_at: string;
    credit_card_id: number;
    created_at: string;
    updated_at: string;
}

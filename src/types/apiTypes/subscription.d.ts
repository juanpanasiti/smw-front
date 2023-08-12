export interface SubscriptionReq {
    title: string;
    cc_name: string;
    total_amount: number;
    is_active: boolean;
    purchased_at: string;
    credit_card_id: number;
}
export interface SubscriptionRes {
    id: number;
    title: string;
    cc_name: string;
    total_amount: number;
    purchased_at: string;
    is_active: boolean;
    credit_card_id: number;
    created_at: string;
    updated_at: string;
}

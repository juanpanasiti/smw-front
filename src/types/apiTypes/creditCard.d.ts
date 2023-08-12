export interface CreditCardReq {
    name: string;
    limit: number;
    main_credit_card_id?: number;
    user_id: number;
}
export interface CreditCardReq {
    id: number;
    name: string;
    limit: number;
    main_credit_card_id?: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

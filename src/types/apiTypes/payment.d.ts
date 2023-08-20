import { Status } from "../payments";

export interface PaymentReq {
    expense_id: number;
    status: Status;
    number: number;
    month: number;
    year: number;
    amount: number;
}

export interface PaymentRes {
    id: number;
    expense_id: number;
    status: Status;
    number: number;
    month: number;
    year: number;
    amount: number;
}

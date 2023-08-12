export interface Statement {
    id: number;
    creditCardId: number;
    dateFrom: string;
    dateTo: string;
    expirationDate: string;
    period: string;
    items: StatementItem[];
}

export interface StatementItem {
    id: number;
    statementId: number;
    amount: number;
    installmentNo: number;
    isConfirmed: boolean;
}

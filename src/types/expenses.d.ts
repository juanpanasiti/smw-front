export interface Purchase {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    totalAmount: number;
    totalInstallments: number;
    purchasedAt: string;
}

export interface Subscription {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    totalAmount: number;
    purchasedAt: string;
    isActive: boolean;
}

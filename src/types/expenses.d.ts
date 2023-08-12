export interface Purchase {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    totalAmount: number;
    totalInstallment: number;
    purchasedAt: Date;
}

export interface Subscription {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    totalAmount: number;
    purchasedAt: Date;
    isActive: boolean;
}

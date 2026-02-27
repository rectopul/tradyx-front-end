// src/types/index.ts

export type DepositStatus = "pending" | "rejected" | "approved";
export type WithdrawalStatus = "pending" | "approved" | "rejected" | "process";
export type PurchaseStatus = "active" | "inactive" | "pending";
export type CommissionStatus = "active" | "inactive";
export type PixType = "RANDOM" | "CPF" | "EMAIL";

export interface Deposit {
    id: number;
    user_id: number;
    method_name: string | null;
    address: string | null;
    transaction_id: string | null;
    order_id: string | null;
    amount: number;
    date: string | null;
    status: DepositStatus;
    created_at: string | null;
    updated_at: string | null;
}

export interface Withdrawal {
    id: number;
    user_id: number;
    name: string;
    cpf: string;
    pix_type: PixType;
    pix_key: string;
    transaction_id: string | null;
    method_name: string | null;
    oid: string | null;
    address: string | null;
    amount: number;
    charge: number;
    final_amount: number;
    status: WithdrawalStatus;
    created_at: string | null;
    updated_at: string | null;
}

export interface Purchase {
    id: number;
    user_id: number;
    package_id: number;
    transaction_id: string;
    amount: number;
    daily_income: number;
    date: string;
    status: PurchaseStatus;
    validity: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface Commission {
    id: number;
    user_id: number | null;
    task_id: number | null;
    amount: number;
    date: string | null;
    status: CommissionStatus;
    token: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface TransactionSummary {
    totalDeposits: number;
    totalWithdrawals: number;
    totalPurchases: number;
    totalCommissions: number;
    activeInvestments: number;
    pendingTransactions: number;
}

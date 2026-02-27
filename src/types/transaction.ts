// Transaction type definitions
export type TransactionType =
    | "deposit"
    | "withdraw"
    | "commission"
    | "purchase"
    | "yield"
    | "investment_withdrawal";

export type TransactionStatus =
    | "pending"
    | "completed"
    | "failed"
    | "cancelled"
    | "confirming"
    | "confirmed"
    | "processing"
    | "refunded"
    | "expired"
    | "rejected";

export interface Transaction {
    id: number;
    user_id: number;
    type: TransactionType;
    currency: string;
    amount: number; // Mantido como string para decimal(28,8)
    status: TransactionStatus;
    description: string | null;
    created_at: string;
    // Inclua outros campos da sua tabela conforme necessário
}

export type TransactionsStatistics = {
    total_deposit: number;
    total_withdraw: number;
    total_commission: number;
    total_purchase: string;
    total_yield: string;
    total_investment_withdrawal: string;
    total_transactions: number;
    total_balance: number;
    total_entradas: number;
    total_saidas: number;
};

export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    last_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    // Outros campos de paginação omitidos para brevidade
}

export type SortCriteria = "date" | "amount" | "type";
export type SortDirection = "asc" | "desc";

export interface TransactionSummaryData {
    totalDeposits: number;
    totalWithdrawals: number;
    totalPurchases: number;
    totalCommissions: number;
    netBalance: number;
}

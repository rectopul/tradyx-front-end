import {
    Transaction,
    TransactionType,
    SortCriteria,
    SortDirection,
    TransactionSummaryData,
} from "@/types/transaction";

// Format currency values
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
};

// Format date to localized string
export const formatDate = (dateString: string | Date): string => {
    const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;

    if (isNaN(date.getTime())) {
        return "Data inválida";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

// Get transaction icon color based on type
export const getTransactionColor = (type: TransactionType): string => {
    switch (type) {
        case "deposit":
            return "text-emerald-500";
        case "withdraw":
            return "text-rose-500";
        case "purchase":
            return "text-blue-500";
        case "commission":
            return "text-purple-500";
        default:
            return "text-gray-500";
    }
};

// Get background color for transaction items
export const getTransactionBgColor = (type: TransactionType): string => {
    switch (type) {
        case "deposit":
            return "bg-emerald-50 dark:bg-emerald-950/30";
        case "withdraw":
            return "bg-rose-50 dark:bg-rose-950/30";
        case "purchase":
            return "bg-blue-50 dark:bg-blue-950/30";
        case "commission":
            return "bg-purple-50 dark:bg-purple-950/30";
        default:
            return "bg-gray-50 dark:bg-gray-800/30";
    }
};

// Get transaction label based on type
export const getTransactionLabel = (type: TransactionType): string => {
    switch (type) {
        case "deposit":
            return "Depósito";
        case "withdraw":
            return "Saque";
        case "purchase":
            return "Compra";
        case "commission":
            return "Comissão";
        default:
            return "Desconhecido";
    }
};

// Sort transactions by amount
export const sortTransactionsByAmount = (
    transactions: Transaction[],
    direction: SortDirection
): Transaction[] => {
    return [...transactions].sort((a, b) => {
        const amountA = typeof a.amount === "number" ? a.amount : 0;
        const amountB = typeof b.amount === "number" ? b.amount : 0;

        return direction === "desc" ? amountB - amountA : amountA - amountB;
    });
};

// Sort transactions by type
export const sortTransactionsByType = (
    transactions: Transaction[],
    direction: SortDirection
): Transaction[] => {
    return [...transactions].sort((a, b) => {
        const typeOrder = {
            deposit: 1,
            withdraw: 2,
            commission: 3,
            purchase: 4,
            yield: 5,
            investment_withdrawal: 6,
        };

        const typeValueA = typeOrder[a.type] || 999;
        const typeValueB = typeOrder[b.type] || 999;

        return direction === "desc"
            ? typeValueB - typeValueA
            : typeValueA - typeValueB;
    });
};

// Sort transactions by date
export const sortTransactionsByDate = (
    transactions: Transaction[],
    direction: SortDirection
): Transaction[] => {
    return [...transactions].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return direction === "desc"
            ? dateB.getTime() - dateA.getTime()
            : dateA.getTime() - dateB.getTime();
    });
};

// General sort function
export const sortTransactions = (
    transactions: Transaction[],
    criteria: SortCriteria,
    direction: SortDirection
): Transaction[] => {
    switch (criteria) {
        case "amount":
            return sortTransactionsByAmount(transactions, direction);
        case "type":
            return sortTransactionsByType(transactions, direction);
        case "date":
        default:
            return sortTransactionsByDate(transactions, direction);
    }
};

// Calculate transaction summary data
export const calculateTransactionSummary = (
    transactions: Transaction[]
): TransactionSummaryData => {
    return transactions.reduce(
        (summary, transaction) => {
            const amount = transaction.amount;

            switch (transaction.type) {
                case "deposit":
                    summary.totalDeposits += amount;
                    break;
                case "withdraw":
                    summary.totalWithdrawals += amount;
                    break;
                case "purchase":
                    summary.totalPurchases += amount;
                    break;
                case "commission":
                    summary.totalCommissions += amount;
                    break;
            }

            // Calculate net balance
            if (
                transaction.type === "deposit" ||
                transaction.type === "commission"
            ) {
                summary.netBalance += amount;
            } else {
                summary.netBalance -= amount;
            }

            return summary;
        },
        {
            totalDeposits: 0,
            totalWithdrawals: 0,
            totalPurchases: 0,
            totalCommissions: 0,
            netBalance: 0,
        }
    );
};

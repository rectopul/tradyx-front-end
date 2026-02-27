// components/transaction-card-list.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
// Assumindo que você tem acesso aos helpers e formatters
import { Transaction } from "@/types/transaction";
import {
    getAmountColorClass,
    getStatusBadge,
    formatTransactionType,
    getTransactionTypeIcon,
} from "./transaction-helpers";
import { formatCurrency, formatDate } from "@/utils/helpers";

interface TransactionCardListProps {
    data: Transaction[];
}

export const TransactionCardList: React.FC<TransactionCardListProps> = ({
    data,
}) => {
    if (data.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Nenhuma transação encontrada.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {data.map((transaction) => {
                const amount = transaction.amount;
                const colorClass = getAmountColorClass(transaction.type);
                const displayAmount = formatCurrency(amount);

                return (
                    <Card
                        key={transaction.id}
                        className="shadow-sm border border-ebony-clay-200"
                    >
                        <CardContent className="px-4 py-2 space-y-2 grid items-center grid-cols-[80px_auto_85px]">
                            {/* Linha 1: Tipo e Status */}
                            <div className="flex justify-between items-start">
                                {getTransactionTypeIcon(transaction.type)}
                            </div>

                            {/* Linha 2: Quantia (Destacada) */}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-600">
                                    {formatTransactionType(transaction.type)}
                                </span>
                                <span className={`text-sm ${colorClass}`}>
                                    {displayAmount}
                                </span>
                            </div>

                            {/* Linha 3: Data */}
                            <div className="flex flex-col gap-1">
                                {getStatusBadge(transaction.status)}
                                <span className="text-gray-500 text-xs self-end pr-1">
                                    {formatDate(transaction.created_at, false)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

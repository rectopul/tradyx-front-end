import { ColumnDef } from "@tanstack/react-table";
import { Transaction, TransactionType } from "@/types/transaction";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
// Certifique-se de que estas utilities estão disponíveis no seu projeto
import {
    getStatusBadge,
    getAmountColorClass,
    formatTransactionType,
} from "./transaction-helpers";
import { formatCurrency, formatDate } from "@/utils/helpers";

export const columns: ColumnDef<Transaction>[] = [
    // Tipo de Transação
    {
        accessorKey: "type",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="text-ebony-clay-700 hover:text-ebony-clay-900" // Usa sua cor customizada
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Tipo
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => formatTransactionType(row.original.type),
    },
    // Quantia
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <div className="text-right">
                <Button
                    variant="ghost"
                    className="text-ebony-clay-700 hover:text-ebony-clay-900"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Quantia (BRL)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const type: TransactionType = row.original.type;
            const colorClass = getAmountColorClass(type);

            return (
                <div className={`text-right ${colorClass}`}>
                    {formatCurrency(amount)}
                </div>
            );
        },
    },
    // Status
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status),
    },
    // Data de Criação
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <div className="text-right">
                <Button
                    variant="ghost"
                    className="text-ebony-clay-700 hover:text-ebony-clay-900"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Data
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-right text-sm text-gray-500">
                {formatDate(row.original.created_at)}
            </div>
        ),
    },
];

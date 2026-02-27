"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUp, Check, CircleMinus } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/utils/formatters";
import { Withdrawal, WithdrawalStatus } from "@/types";
import { Badge } from "@/components/ui/badge";

export function BadgeType(status: WithdrawalStatus) {
    switch (status) {
        case "approved":
            return <Badge variant="success">Aprovado</Badge>;
        case "pending":
            return <Badge variant="pending">Pendente</Badge>;
        case "rejected":
            return <Badge variant="destructive">Rejeitado</Badge>;
        case "processing":
            return <Badge variant="processing">Processando</Badge>;

        default:
            return <Badge variant="destructive">{status}</Badge>;
    }
}

export type WithdrawActionsProps = {
    onApprove: (wId: number) => void;
    onReject: (wId: number) => void;
};

export const getWithdawsColumns = ({
    onApprove,
    onReject,
}: WithdrawActionsProps): ColumnDef<Withdrawal>[] => [
    {
        accessorKey: "oid",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ID
                    <ArrowUp />
                </Button>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Usuário
                    <ArrowUp />
                </Button>
            );
        },
        cell: ({ row }) => {
            if (!row.original.user) return null;

            const isAffiliate = Boolean(row.original.user.is_afiliate);
            const balance = row.original.user.balance;

            return (
                <div className="p-2 border rounded-md shadow-sm bg-white">
                    {/* Cabeçalho com nome e badge */}
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm truncate max-w-xs">
                            {row.original.name}
                        </h4>
                        <span
                            className={`text-xs px-1.5 py-0.5 rounded-md inline-flex items-center ${
                                isAffiliate
                                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                    : "bg-gray-50 text-gray-600 border border-gray-200"
                            }`}
                        >
                            <span
                                className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                    isAffiliate
                                        ? "bg-indigo-500"
                                        : "bg-gray-400"
                                }`}
                            ></span>
                            {isAffiliate ? "Afiliado" : "Comum"}
                        </span>
                    </div>

                    {/* Dados principais em formato compacto */}
                    <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex items-center">
                            <span className="w-14 text-gray-500">CPF:</span>
                            <span className="font-medium">
                                {row.original.cpf || "—"}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <span className="w-14 text-gray-500">PIX:</span>
                            <span className="font-medium truncate max-w-xs">
                                {row.original.pix_key || "—"}
                            </span>
                        </div>
                    </div>

                    {/* Linha separadora */}
                    <div className="my-1.5 border-t border-gray-100"></div>

                    {/* Rodapé com informações financeiras/importantes */}
                    <div className="grid grid-cols-3 gap-2 items-center text-xs">
                        <div className="flex items-center">
                            <span className="font-norma; bg-yellow-500/50 rounded-sm text-slate-500 px-2 h-5 text-xxs">
                                {row.original.pix_type || "—"}
                            </span>
                        </div>

                        <div className="flex gap-1 items-center justify-center mr-4">
                            <span>Investido: </span>
                            <span className="text-xs text-green-500 font-bold">
                                {formatCurrency(
                                    row.original.user.total_invested_data
                                )}
                            </span>
                        </div>

                        <div className="flex items-center font-medium">
                            <span className="mr-1 text-gray-500">Saldo:</span>
                            <span
                                className={`${
                                    balance > 0
                                        ? "text-emerald-600"
                                        : balance < 0
                                        ? "text-red-600"
                                        : "text-gray-600"
                                }`}
                            >
                                {formatCurrency(row.original.user.balance)}
                            </span>
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "user.phone",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Telefone
                    <ArrowUp />
                </Button>
            );
        },
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Gateway
                    <ArrowUp />
                </Button>
            );
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Valor Bruto
                    <ArrowUp />
                </Button>
            );
        },
        cell: ({ row }) => formatCurrency(row.original.amount),
    },
    {
        accessorKey: "final_amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Valor Liquido
                    <ArrowUp />
                </Button>
            );
        },
        cell: ({ row }) => formatCurrency(row.original.final_amount),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUp />
                </Button>
            );
        },
        cell: ({ row }) => {
            return BadgeType(row.original.status);
        },
    },
    {
        accessorKey: "id",
        header: () => {
            return <span className="h-8 px-9">Açoes</span>;
        },
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">Açoes</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[250px]">
                        <DropdownMenuLabel>Açoes disponíveis</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onApprove(row.original.id)}
                        >
                            <Check stroke="green" /> Aprovar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onReject(row.original.id)}
                        >
                            <CircleMinus stroke="red" /> Negar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Data
                    <ArrowUp />
                </Button>
            );
        },
        cell: ({ row }) => (
            <span className="text-nowrap">
                {formatDateTime(row.original.created_at as string)}
            </span>
        ),
    },
];

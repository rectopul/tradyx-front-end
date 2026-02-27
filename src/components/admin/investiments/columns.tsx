"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DepositStatus } from "@/types";
import { Purchase } from "@/types/purchase";
import { formatCurrency } from "@/utils/formatters";
import { asset, formatDate } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUp,
    Check,
    CircleSlash,
    EllipsisVertical,
    Hourglass,
    X,
} from "lucide-react";

export interface updateDepositStatusPops {
    onStatusChange: (depositId: number, status: DepositStatus) => void;
}

export const getInvestmentsColumns = ({
    onStatusChange,
}: updateDepositStatusPops): ColumnDef<Purchase>[] => [
    {
        accessorKey: "id",
        header: ({ table }) => (
            <Checkbox
                className="rounded-[4px] data-[state=checked]:bg-blue-400"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                className="rounded-[4px]"
                onCheckedChange={(value: boolean) =>
                    row.toggleSelected(!!value)
                }
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "package.name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Pacote
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.original.package.name;

            return <div className="flex items-center gap-2 pl-4">{name}</div>;
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Valor Pago
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = row.original.amount;

            return (
                <div className="flex items-center gap-2 pl-4">
                    <span className="p-2 rounded-md bg-slate-200">
                        {formatCurrency(amount)}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "package.photo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Imagem
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const image = row.original.package.photo;
            const name = row.original.package.name;

            return (
                <div className="flex items-center gap-2 pl-4">
                    <img
                        src={asset("/" + image)}
                        alt={`package_investment_${name}`}
                        width={55}
                        className="rounded-md"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "daily_income",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Retorno Diário
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = row.original.daily_income;

            return (
                <div className="font-normal text-slate-800 pl-4">
                    {row.original.package.commission_percentage}% /{" "}
                    {formatCurrency(amount)}
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Data do rendimento
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-normal text-slate-800 pl-4">
                    {formatDate(row.original.date)}
                </div>
            );
        },
    },
    {
        accessorKey: "user",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Usuário
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-medium">
                    {row.original.user
                        ? row.original.user.phone
                        : "Usuário não existe"}
                </div>
            );
        },
    },
    {
        accessorKey: "actions",
        header: () => {
            return <></>;
        },
        cell: ({ row }) => {
            const id = row.getValue("id") as number;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className="text-slate-400 rounded-sm p-2 hover:text-slate-900">
                            <EllipsisVertical size={17} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Açoes</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <button
                                className="w-full flex items-center gap-2"
                                onClick={() => onStatusChange(id, "approved")}
                            >
                                <span className="w-4 h-4 bg-green-600 text-white rounded-sm flex justify-center items-center">
                                    <Check size={2} className="scale-75" />
                                </span>
                                Aprovar
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button
                                className="w-full flex items-center gap-2"
                                onClick={() => onStatusChange(id, "rejected")}
                            >
                                <span className="w-4 h-4 bg-red-600 text-white rounded-sm flex justify-center items-center">
                                    <CircleSlash
                                        size={2}
                                        className="scale-75"
                                    />
                                </span>
                                Rejeitar
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button
                                className="w-full flex items-center gap-2"
                                onClick={() => onStatusChange(id, "canceled")}
                            >
                                <span className="w-4 h-4 bg-gray-500 text-white rounded-sm flex justify-center items-center">
                                    <X size={2} className="scale-75" />
                                </span>
                                Cancelar
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button
                                className="w-full flex items-center gap-2"
                                onClick={() => onStatusChange(id, "pending")}
                            >
                                <span className="w-4 h-4 bg-yellow-600 text-white rounded-sm flex justify-center items-center">
                                    <Hourglass size={2} className="scale-75" />
                                </span>
                                Pendente
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

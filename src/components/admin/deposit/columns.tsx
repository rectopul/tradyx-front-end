"use client";

import { Bank } from "@/assets/icons/Bank";
import { CardStatus } from "@/components/CardStatus";
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
import { Deposit, DepositStatus } from "@/types";
import { formatDateTime } from "@/utils/formatters";
import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUp,
    Check,
    CircleSlash,
    EllipsisVertical,
    Hourglass,
    User,
    X,
} from "lucide-react";
import {
    QrCode,
    Bitcoin,
    Wallet,
    Barcode,
    DollarSign,
    Repeat,
    HelpCircle,
} from "lucide-react";
import { useRef } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const getMethodIcon = (method: string) => {
    const map: Record<string, JSX.Element> = {
        pix: <QrCode size={15} />,
        ted: <Bank size={15} />,
        doc: <Bank size={15} />,
        boleto: <Barcode size={15} />,
        internal: <Repeat size={15} />,
        bitcoin: <Bitcoin size={15} />,
        ethereum: <Wallet size={15} />,
        usdt: <DollarSign size={15} />,
    };

    // Se não encontrar, retorna ícone genérico
    return map[method.toLowerCase()] ?? <HelpCircle size={15} />;
};

export interface updateDepositStatusPops {
    onStatusChange: (depositId: number, status: DepositStatus) => void;
}

export const getColumns = ({
    onStatusChange,
}: updateDepositStatusPops): ColumnDef<Deposit>[] => [
    {
        accessorKey: "id",
        header: ({ table }) => (
            <Checkbox
                className="rounded-[4px] data-[state=checked]:bg-blue-400"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                className="rounded-[4px]"
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "transaction_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Transaction ID
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "user_id",
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
            const userPhone = row.original.user?.phone;
            const btnRef = useRef<HTMLButtonElement | null>(null);

            const copyToClipboard = (text: string) => {
                if (!text) return; // evita erro se estiver vazio

                navigator.clipboard.writeText(text);
                if (btnRef.current) {
                    btnRef.current.innerText = "Copiado";
                    setTimeout(() => {
                        if (btnRef.current) btnRef.current.innerText = "Copiar";
                    }, 2000);
                }
            };

            return (
                <div className="flex items-center gap-2 group relative">
                    <span className="p-2 rounded-sm bg-slate-200">
                        <User size={15} />
                    </span>
                    {userPhone}
                    <button
                        ref={btnRef}
                        onClick={() => copyToClipboard(userPhone ?? "")}
                        className="
                            absolute -right-3
                            translate-y-2 opacity-0 
                            group-hover:translate-y-0 group-hover:opacity-100 
                            transition-all duration-300 ease-out
                            rounded-md h-6 px-2 flex justify-center items-center 
                            border border-slate-300 text-xxs bg-white shadow-sm
                        "
                    >
                        Copiar
                    </button>
                </div>
            );
        },
    },
    {
        accessorKey: "method_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Método
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const method_name = row.getValue("method_name") as string;

            return (
                <div className="flex items-center gap-2">
                    <span className="p-2 rounded-sm bg-slate-200">
                        {getMethodIcon(method_name)}
                    </span>
                    {method_name}
                </div>
            );
        },
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Gatewway
                    <ArrowUp className="ml-2 h-4 w-4" />
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
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Valor
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount);

            return (
                <div className="font-semibold text-green-500">+{formatted}</div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Data
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const dateString = row.getValue("created_at") as string;

            return (
                <div className="font-medium">{formatDateTime(dateString)}</div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as DepositStatus;

            return <CardStatus status={status} />;
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

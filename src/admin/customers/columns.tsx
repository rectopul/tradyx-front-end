"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { UserData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUp, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { fetchCustomerBanUnban, isAfliliated } from "@/services/adminServices";
import { useState } from "react";
import { BalanceCell } from "./BalanceCell";
import { useAdmin } from "@/contexts/admin/admin-context";
import { formatCurrency } from "@/utils/formatters";
import { RenewPassword } from "./RenewPassword";

export const column: ColumnDef<UserData>[] = [
    {
        accessorKey: "id",
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
        accessorKey: "profile_photo_url",
        header: "Foto",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <Avatar>
                    <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${user?.name}`}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "ref_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Código de indicação
                    <ArrowUp />
                </Button>
            );
        },
    },
    {
        accessorKey: "ref_by",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Referido por
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
                    Nome
                    <ArrowUp />
                </Button>
            );
        },
    },
    {
        accessorKey: "phone",
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
        accessorKey: "balance",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Saldo
                    <ArrowUp />
                </Button>
            );
        },
        cell: ({ row }) => formatCurrency(row.original.balance),
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
    },
    {
        accessorKey: "is_afiliate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Afiliado
                    <ArrowUp />
                </Button>
            );
        },
        cell: ({ row }) => {
            const { is_afiliate } = row.original;
            const { updateCustomer } = useAdmin();
            const [afiliated, setAfiliated] = useState<boolean>(
                Boolean(is_afiliate)
            );

            const handleAfiliated = async () => {
                toast.loading("Processando operação");
                try {
                    setAfiliated(!afiliated);
                    const afiliatedData = await isAfliliated({
                        user_id: row.original.id,
                        is_affiliate: !is_afiliate,
                    });

                    updateCustomer({
                        ...afiliatedData.user,
                    });

                    toast.dismiss();

                    toast.success("Sucesso", {
                        description: "Processo concluído",
                    });
                } catch (error) {
                    toast.dismiss();
                    setAfiliated(!afiliated);
                    if (error instanceof AxiosError) {
                        const apiError = ApiException.fromAxiosError(error);

                        if (apiError.hasErrorFor("user_id")) {
                            toast.error(apiError.getErrorFor("user_id"));
                        } else {
                            toast.error(error.message);
                        }
                    }
                }
            };

            return (
                <Switch
                    onCheckedChange={handleAfiliated}
                    checked={Boolean(afiliated)}
                />
            );
        },
    },
    {
        accessorKey: "actions_" + "id",
        header: () => {
            return <span className="h-8 px-9">Açoes</span>;
        },
        cell: ({ row }) => {
            const { updateCustomer } = useAdmin();

            const handleBanUnban = async () => {
                toast.loading("Processando operação");
                try {
                    const { user } = await fetchCustomerBanUnban(
                        row.original.id
                    );

                    updateCustomer(user);

                    toast.dismiss();

                    toast.success("Sucesso", {
                        description: "Processo concluído",
                    });
                } catch (error) {
                    toast.dismiss();
                    if (error instanceof AxiosError) {
                        const apiError = ApiException.fromAxiosError(error);

                        if (apiError.hasErrorFor("user_id")) {
                            toast.error(apiError.getErrorFor("user_id"));
                        } else {
                            toast.error(error.message);
                        }
                    }
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">Açoes</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[250px]">
                        <DropdownMenuLabel>Açoes disponíveis</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <RenewPassword row={row} />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleBanUnban}>
                            {row.original.ban_unban === "unban" ? (
                                <>
                                    <LockKeyhole stroke="red" /> Banir Usuário
                                </>
                            ) : (
                                <>
                                    <LockKeyholeOpen stroke="red" />
                                    Desbanir Usuário
                                </>
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <BalanceCell row={row} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

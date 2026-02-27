"use client";

import { Prisma } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export const columns: ColumnDef<Prisma.User>[] = [
    {
        accessorKey: "ID",
        header: "id",
    },
    {
        accessorKey: "Nome",
        header: "name",
    },
    {
        accessorKey: "Email",
        header: "email",
    },
    {
        accessorKey: "Açoes",
        header: "",
        cell: ({ row }) => {
            const id = row.original.id;

            return (
                <div className="flex items-center gap-2">
                    <Button size="sm" data-user={id}>
                        Editar
                    </Button>
                    <Button size="sm" variant="destructive">
                        Excluir
                    </Button>
                </div>
            );
        },
    },
];

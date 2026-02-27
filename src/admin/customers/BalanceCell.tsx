import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // Assumindo que você usa essa biblioteca de toast
import { fetchIncrementBalanceCustomer } from "@/services/adminServices";
import { Row } from "@tanstack/react-table";
import { UserData } from "@/types";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { useAdmin } from "@/contexts/admin/admin-context";

export interface TableMeta {
    updateData: (rowId: string) => void;
}

// Componente de célula para edição de saldo
export const BalanceCell = ({ row }: { row: Row<UserData> }) => {
    const { id } = row.original;
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [amount, setAmount] = useState("");
    const { updateCustomer } = useAdmin();

    // Função para atualizar o saldo
    const handleIncrementBalance = async () => {
        let rawValue = amount.replace(/[^\d,]/g, "");
        rawValue = rawValue.replace(",", ".");
        const amountValue = parseFloat(rawValue);

        if (isNaN(amountValue)) {
            toast.error("Por favor, insira um valor válido");
            return;
        }

        toast.loading("Atualizando saldo...");

        try {
            const user = await fetchIncrementBalanceCustomer(id, {
                amount: amountValue,
            });

            // Atualiza os dados da tabela usando a função meta
            updateCustomer(user);

            // Limpa e fecha o dialog
            setAmount("");
            setIsDialogOpen(false);

            toast.dismiss();
            toast.success("Saldo atualizado com sucesso", {
                description: `Novo saldo: ${user.balance}`,
            });
        } catch (error) {
            toast.dismiss();

            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("amount")) {
                    toast.error("Erro ao atualizar saldo", {
                        description: apiError.getErrorFor("amount"),
                    });
                    return;
                } else {
                    toast.error("Erro ao atualizar saldo", {
                        description: error.message,
                    });
                    return;
                }
            }

            toast.error("Erro ao atualizar saldo", {
                description: "Erro desconhecido",
            });

            return;
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = event.target.value.replace(/\D/g, ""); // Remove tudo que não for número
        let numericValue = parseFloat(rawValue) / 100; // Divide por 100 para centavos
        setAmount(formatCurrency(numericValue));
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    <DollarSign stroke="green" /> Adicionar saldo
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Atualizar saldo do usuário</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="amount">
                                Valor a adicionar/remover:
                            </label>
                            <Input
                                id="amount"
                                type="text"
                                inputMode="numeric"
                                value={amount}
                                onChange={handleInputChange}
                                placeholder="Digite um valor"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleIncrementBalance}>
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

import { useRef, useState } from "react";
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
import { fetchCustomerChangePassword } from "@/services/adminServices";
import { Row } from "@tanstack/react-table";
import { UserData } from "@/types";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { KeyRound } from "lucide-react";

export interface TableMeta {
    updateData: (rowId: string) => void;
}

// Componente de célula para edição de saldo
export const RenewPassword = ({ row }: { row: Row<UserData> }) => {
    const { id } = row.original;
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Função para atualizar o saldo
    const handleChangePassword = async () => {
        if (!inputRef.current) {
            return toast.dismiss();
        }

        if (String(inputRef.current.value).length < 10) {
            toast.error("A senha deve ter pelo menos 10 dígitos");
            return;
        }

        toast.loading("Atualizando saldo...");

        try {
            await fetchCustomerChangePassword({
                new_password: String(inputRef.current.value),
                user_id: id,
            });

            inputRef.current.value = " ";
            setIsDialogOpen(false);

            toast.dismiss();
            toast.success("Sucesso", {
                description: `Senha alterada com sucesso!`,
            });
        } catch (error) {
            toast.dismiss();

            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("new_password")) {
                    toast.error("Erro ao alterar senha", {
                        description: apiError.getErrorFor("new_password"),
                    });
                    return;
                } else {
                    toast.error("Erro ao alterar senha", {
                        description: error.message,
                    });
                    return;
                }
            }

            toast.error("Erro ao alterar senha", {
                description: "Erro desconhecido",
            });

            return;
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    <KeyRound /> Redefinir Senha
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Redefinir senha do utuário</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="amount">Nova senha:</label>
                            <Input
                                id="new_password"
                                ref={inputRef}
                                type="text"
                                placeholder="Digite a nova senha"
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
                        <Button onClick={handleChangePassword}>
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

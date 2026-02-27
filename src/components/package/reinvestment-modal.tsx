import { useState } from "react";
import { toast } from "sonner";
import { investmentService } from "@/services/investment";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"; // Assumindo que você usa Shadcn/Radix components para o Sheet
import { Input } from "@/components/ui/input"; // Assumindo Input
import { Button } from "@/components/ui/button"; // Assumindo Button
import { formatCurrency } from "@/utils/helpers";
import { useUser } from "@/contexts/UserProvider"; // Para atualizar o saldo
import { Purchase } from "@/types/purchase";

export interface ReinvestModalProps {
    purchase: Purchase;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ReinvestModal: React.FC<ReinvestModalProps> = ({
    purchase,
    isOpen,
    onOpenChange,
}) => {
    const [amount, setAmount] = useState<number | string>("");
    const [isLoading, setIsLoading] = useState(false);
    const { updatePurchase, user } = useUser();
    const availableAmount = purchase.daily_income; // O valor disponível para reinvestir é o total_paid

    const handleReinvest = async () => {
        const value = parseFloat(amount.toString());

        if (isNaN(value) || value <= 0) {
            return toast.error("Valor inválido", {
                description:
                    "Por favor, insira um valor numérico positivo para reinvestir.",
            });
        }
        if (value > availableAmount) {
            return toast.error("Valor excede o limite", {
                description: `Você pode reinvestir no máximo ${formatCurrency(
                    availableAmount
                )}.`,
            });
        }

        setIsLoading(true);
        toast.loading("Registrando reinvestimento...", {
            id: "reinvest-loading",
        });

        try {
            // Requisição POST para /user/investment/reinvestment
            const response = await investmentService.reinvestment({
                purchase_id: purchase.id,
                amount: value,
            });

            // Lógica de atualização de estado no front-end
            // Você pode querer atualizar o 'purchase' pai, se a API retornar dados atualizados
            // updatePurchase(response.data); // Descomente se a API retornar a Purchase atualizada

            if (user && response.data) {
                // Diminui o total_paid da compra original (se o reinvestimento usa este valor)
                // e atualiza o saldo do usuário (se for o caso)
                const newPurchaseTotalPaid = Math.max(
                    0,
                    purchase.daily_income - value
                );
                const updatedPurchase = {
                    ...purchase,
                    total_paid: newPurchaseTotalPaid,
                };

                updatePurchase(updatedPurchase);

                // Nota: O saldo do usuário (user.balance) não é alterado aqui, pois
                // o reinvestimento é uma movimentação INTERNA do 'total_paid'
            }

            toast.dismiss("reinvest-loading");
            toast.success("Reinvestimento criado!", {
                description: response.message,
            });

            setAmount("");
            onOpenChange(false); // Fecha o modal
        } catch (error) {
            // Lógica de tratamento de erro simplificada
            toast.dismiss("reinvest-loading");
            toast.error("Erro ao reinvestir", {
                description:
                    "Não foi possível completar a operação. Tente novamente.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent
                side="bottom"
                className="h-auto max-h-[90vh] bg-ebony-clay-950 border-t border-ebony-clay-700 backdrop-blur-md rounded-t-2xl font-avenir text-white"
            >
                <SheetHeader>
                    <SheetTitle className="text-white">
                        Reinvestir em {purchase.package?.name ?? "Pacote"}
                    </SheetTitle>
                    <SheetDescription className="text-white/70">
                        Seu valor pago de lucro está disponível para
                        reinvestimento, incentivando o **crescimento composto**.
                    </SheetDescription>
                </SheetHeader>

                <div className="py-4 space-y-4">
                    <div className="text-sm text-white/80">
                        Valor disponível para reinvestimento:
                        <span className="text-green-400 font-bold ml-2">
                            {formatCurrency(availableAmount)}
                        </span>
                    </div>

                    <label className="block space-y-1">
                        <span className="text-sm font-medium text-white">
                            Valor a Reinvestir (R$)
                        </span>
                        <Input
                            type="number"
                            placeholder="Ex: 50.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-ebony-clay-900 border-ebony-clay-700 text-white focus:ring-green-500"
                        />
                    </label>
                </div>

                <SheetFooter className="mt-6">
                    <Button
                        onClick={handleReinvest}
                        disabled={
                            isLoading ||
                            parseFloat(amount.toString()) > availableAmount
                        }
                        className="w-full h-12 bg-green-600 hover:bg-green-500 transition-colors text-white font-bold"
                    >
                        {isLoading
                            ? "Processando..."
                            : `Reinvestir ${
                                  amount
                                      ? formatCurrency(
                                            parseFloat(amount.toString())
                                        )
                                      : ""
                              }`}
                    </Button>
                </SheetFooter>
                <SheetClose asChild>
                    <Button
                        variant="ghost"
                        className="w-full mt-2 text-white/70 hover:text-white"
                    >
                        Cancelar
                    </Button>
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
};

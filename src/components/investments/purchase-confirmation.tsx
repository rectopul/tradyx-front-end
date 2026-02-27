import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Package } from "../admin/packages/columns";
import { X } from "lucide-react";
import { asset, formatCurrency } from "@/utils/helpers";
import { toast } from "sonner";
import { purchasePackage } from "@/services/transactionsService";
import { useState } from "react";
import { useUser } from "@/contexts/UserProvider";

interface PurchaseConfirmationProps {
    investment: Package;
}

interface DetailItemProps {
    label: string;
    value: string | number; // Permite que o valor seja string (como moeda formatada) ou número
    color: string;
    isBold?: boolean; // Opcional, será 'false' se não for passado
}

// 2. Componente com Tipagem (DetailItem)
const DetailItem = ({
    label,
    value,
    color,
    isBold = false,
}: DetailItemProps) => (
    <div className="flex justify-between items-center text-sm font-space">
        <span className="text-white/80">{label}:</span>
        {/* Classes dinâmicas para a cor e negrito */}
        <span
            className={`${color} ${
                isBold ? "font-extrabold text-base" : "font-bold"
            }`}
        >
            {value}
        </span>
    </div>
);

export function PurchaseConfirmation({
    investment,
}: PurchaseConfirmationProps) {
    const dailyReturn = investment.return_amount / investment.total_duration;
    const [open, setOpen] = useState(false);
    const [isBuying, setIsBuying] = useState(false);
    const { subtractBalance } = useUser();

    const handleBuyPackage = async () => {
        setIsBuying(true);
        try {
            const confirmation = await purchasePackage(investment.id);
            subtractBalance(confirmation.purchase.amount);
        } catch (error) {
            toast.error("Erro ao processar compra");
        } finally {
            setIsBuying(false);
            setOpen(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="bg-transparent" asChild>
                <button
                    className="rounded-xl w-full absolute bottom-0 left-0 mt-1 mx-auto bg-orange-gradient shadow-top-inset shadow-cream-can-100 border border-cream-can-600 p-2 flex justify-center items-center text-sm font-black font-poppins text-cream-can-900 text-shadow text-shadow-size-sm text-shadow-color-cream-can-200"
                    aria-label={`Comprar ${investment.title}`}
                >
                    {formatCurrency(investment.total_investment)}
                </button>
            </SheetTrigger>
            <SheetContent
                side="bottom"
                // Mantém as classes de fundo e estilo
                className="h-[600px] bg-main-gradient data-[state=open]:shadow-top-inset shadow-tradyx-100 border-t border-tradyx-950 backdrop-blur-md rounded-t-[30px] font-avenir text-white p-4 sm:p-6"
            >
                <SheetHeader className="text-center pb-4 mt-5 relative font-space">
                    <SheetTitle className="text-white text-xl w-52 mx-auto font-bold border-b-2 border-tradyx-700 pb-2">
                        Confirmar compra
                    </SheetTitle>
                    <SheetDescription className="text-white/70 font-normal text-sm pt-2">
                        Confirmar a compra de **{investment.name}**
                    </SheetDescription>

                    <SheetClose asChild>
                        <button className="rounded-xl absolute -top-7 right-0 w-8 h-8 mt-1 mx-auto bg-orange-gradient shadow-top-inset shadow-cream-can-100 border border-cream-can-600 flex justify-center items-center text-sm font-black font-poppins text-cream-can-900 text-shadow text-shadow-size-sm text-shadow-color-cream-can-200 z-20">
                            <X className="w-5 h-5" strokeWidth={3} />
                        </button>
                    </SheetClose>
                </SheetHeader>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Bloco de Imagem e Descrição */}
                    <div className="w-full sm:w-2/5 flex flex-col items-center">
                        <figure className="w-full max-w-xs h-32 rounded-lg overflow-hidden border border-ebony-clay-700 shadow-lg">
                            <img
                                src={
                                    asset(investment.photo) ||
                                    "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400"
                                }
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400";
                                }}
                                className="w-full h-full object-cover"
                                alt={`Imagem do pacote ${investment.name}`}
                            />
                        </figure>
                        <p className="text-xs text-white/60 mt-2 text-center hidden sm:block">
                            {investment.description ||
                                "Descrição não disponível."}
                        </p>
                    </div>

                    {/* Bloco de Detalhes Financeiros (Mais profissional e detalhado) */}
                    <div className="flex-1 space-y-3 p-3 bg-ebony-clay-900/40 rounded-lg border border-ebony-clay-700">
                        {/* Linha 1: Valor e Duração */}
                        <DetailItem
                            label="Valor do Investimento"
                            value={formatCurrency(investment.total_investment)}
                            color="text-pacific-blue-400"
                            isBold
                        />

                        <DetailItem
                            label="Duração Total"
                            value={`${investment.total_duration} ${investment.frequency_unit}s`}
                            color="text-yellow-400"
                            isBold
                        />

                        {/* Divisor */}
                        <div className="border-t border-ebony-clay-700 my-2" />

                        {/* Linha 2: Retornos (Mais visível) */}
                        <DetailItem
                            label="Retorno Diário Estimado"
                            value={formatCurrency(dailyReturn)}
                            color="text-green-400"
                        />

                        <DetailItem
                            label="Retorno Total (Estimado)"
                            // Assumindo que 'return_amount' é o valor total de retorno no fim do ciclo.
                            value={formatCurrency(investment.return_amount)}
                            color="text-green-400"
                        />

                        {/* Linha 3: Taxas */}
                        <DetailItem
                            label="Comissão da Plataforma"
                            value={`${investment.commission_percentage}%`}
                            color="text-red-400"
                        />
                    </div>
                </div>

                {/* Footer com Ações */}
                <SheetFooter className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-ebony-clay-700/50">
                    {/* Botão de Investir */}
                    <button
                        className="rounded-xl w-full mt-1 mx-auto bg-orange-gradient shadow-top-inset shadow-cream-can-100 border border-cream-can-600 p-2 flex justify-center items-center text-sm font-black font-poppins text-cream-can-900 text-shadow text-shadow-size-sm text-shadow-color-cream-can-200"
                        onClick={handleBuyPackage}
                        disabled={isBuying}
                    >
                        {isBuying ? (
                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        ) : (
                            "Confirmar"
                        )}
                    </button>

                    {/* Botão de Cancelar */}
                    <button
                        className="bg-red-700 hover:bg-red-600 transition-colors rounded-lg text-white text-base font-bold uppercase h-12 flex items-center justify-center shadow-lg shadow-red-900/50"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

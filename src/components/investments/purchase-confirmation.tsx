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
import { X, TrendingUp, Clock, ShieldCheck, Wallet } from "lucide-react";
import { asset, formatCurrency } from "@/utils/helpers";
import { toast } from "sonner";
import { purchasePackage } from "@/services/transactionsService";
import { useState } from "react";
import { useUser } from "@/contexts/UserProvider";
import { Button } from "../ui/button";

interface PurchaseConfirmationProps {
    investment: Package;
}

interface DetailItemProps {
    label: string;
    value: string | number;
    icon?: React.ElementType;
    color?: string;
}

const DetailItem = ({
    label,
    value,
    icon: Icon,
    color = "text-gray-900",
}: DetailItemProps) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
        <div className="flex items-center gap-3">
            {Icon && <div className="p-2 bg-white rounded-xl shadow-sm text-brand"><Icon size={18} /></div>}
            <span className="text-sm font-bold text-gray-400">{label}</span>
        </div>
        <span className={`text-base font-extrabold ${color}`}>
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
            toast.success("Plano adquirido com sucesso!");
        } catch (error) {
            toast.error("Erro ao processar compra. Verifique seu saldo.");
        } finally {
            setIsBuying(false);
            setOpen(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="bg-brand hover:bg-brand/90 text-gray-900 font-bold rounded-2xl px-5 py-2 h-auto text-xs shadow-lg shadow-brand/10 transition-all active:scale-95">
                    Investir
                </Button>
            </SheetTrigger>
            <SheetContent
                side="bottom"
                className="h-auto max-h-[90vh] bg-white border-t border-gray-100 rounded-t-[40px] p-6 sm:p-10 font-sans outline-none overflow-y-auto"
            >
                <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>

                <SheetHeader className="text-left space-y-2 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-brand uppercase tracking-widest">Confirmação</span>
                            <SheetTitle className="text-3xl font-extrabold text-gray-900">
                                {investment.name}
                            </SheetTitle>
                        </div>
                        <SheetClose asChild>
                            <button className="p-3 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                                <X size={20} />
                            </button>
                        </SheetClose>
                    </div>
                    <SheetDescription className="text-base text-gray-500 font-medium">
                        Revise os detalhes do seu investimento antes de confirmar.
                    </SheetDescription>
                </SheetHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <DetailItem
                        label="Valor do Investimento"
                        value={formatCurrency(investment.total_investment)}
                        icon={Wallet}
                    />
                    <DetailItem
                        label="Retorno Total Estimado"
                        value={formatCurrency(investment.return_amount)}
                        icon={TrendingUp}
                        color="text-green-600"
                    />
                    <DetailItem
                        label="Duração do Plano"
                        value={`${investment.total_duration} ${investment.frequency_unit === 'day' ? 'Dias' : investment.frequency_unit}`}
                        icon={Clock}
                    />
                    <DetailItem
                        label="Retorno Diário"
                        value={formatCurrency(dailyReturn)}
                        icon={ShieldCheck}
                        color="text-brand"
                    />
                </div>

                <div className="bg-brand/5 border border-brand/10 rounded-3xl p-6 mb-10">
                    <p className="text-sm text-brand/80 font-medium leading-relaxed">
                        Ao confirmar, o valor de <span className="font-bold text-gray-900">{formatCurrency(investment.total_investment)}</span> será debitado do seu saldo disponível e o plano será ativado imediatamente.
                    </p>
                </div>

                <SheetFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <button
                        className="w-full sm:flex-1 py-5 bg-brand hover:bg-brand/90 text-gray-900 font-bold text-lg rounded-[24px] shadow-xl shadow-brand/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                        onClick={handleBuyPackage}
                        disabled={isBuying}
                    >
                        {isBuying ? (
                            <span className="animate-spin h-6 w-6 border-3 border-gray-900 border-t-transparent rounded-full"></span>
                        ) : (
                            <>Confirmar Investimento</>
                        )}
                    </button>

                    <button
                        className="w-full sm:w-auto px-10 py-5 bg-gray-50 hover:bg-gray-100 text-gray-400 font-bold text-lg rounded-[24px] transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

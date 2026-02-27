import { Badge } from "@/components/ui/badge"; // Componente Badge do shadcn/ui
import { TransactionType, TransactionStatus } from "@/types/transaction"; // Ajuste o caminho
import { BanknoteArrowDown, BanknoteArrowUp, Gift } from "lucide-react";

// Traduz o tipo de transação para exibição
export function formatTransactionType(type: TransactionType): string {
    const translations: Record<TransactionType, string> = {
        deposit: "Depósito",
        withdraw: "Saque",
        commission: "Comissão",
        purchase: "Compra",
        yield: "Rendimento",
        investment_withdrawal: "Resgate de Invest.",
    };
    return translations[type] || type;
}

// Aplica o Badge visual com cores baseadas no Status
export function getStatusBadge(status: TransactionStatus) {
    switch (status) {
        case "completed":
        case "confirmed":
            return (
                <Badge className="bg-green-600 hover:bg-green-700 !text-white text-center text-xxs !items-center !flex self-end">
                    Completo
                </Badge>
            );
        case "pending":
        case "confirming":
            return (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 !text-white text-center text-xxs items-center self-end">
                    Pendente
                </Badge>
            );
        case "processing":
            // Usa sua cor customizada para um status neutro/importante
            return (
                <Badge className="bg-ebony-clay-600 hover:bg-ebony-clay-700 !text-white text-center text-xxs self-end">
                    Processando
                </Badge>
            );
        case "failed":
        case "cancelled":
        case "rejected":
        case "expired":
            return <Badge variant="destructive">Falhado</Badge>; // Destructive do shadcn
        case "refunded":
            return (
                <Badge className="bg-blue-600 hover:bg-blue-700 !text-white text-center text-xxs self-end">
                    Estornado
                </Badge>
            );
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
}

// Determina a cor do texto da quantia (entrada ou saída)
export function getAmountColorClass(type: TransactionType): string {
    switch (type) {
        case "deposit":
        case "commission":
        case "yield":
            return "text-green-600 font-semibold"; // Entradas
        case "withdraw":
        case "purchase":
        case "investment_withdrawal":
            return "text-red-600 font-semibold"; // Saídas
        default:
            return "text-foreground";
    }
}

export function getTransactionTypeIcon(type: TransactionType) {
    switch (type) {
        case "deposit":
        case "commission":
        case "yield":
            return (
                <>
                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                        <BanknoteArrowUp className="w-4 h-4" />
                    </div>
                </>
            ); // Entradas
        case "withdraw":
        case "purchase":
        case "investment_withdrawal":
            return (
                <>
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                        <BanknoteArrowDown className="w-4 h-4" />
                    </div>
                </>
            ); // Saídas
        default:
            return (
                <>
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                        <Gift className="w-4 h-4" />
                    </div>
                </>
            );
    }
}

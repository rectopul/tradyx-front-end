import { Badge } from "@/components/ui/badge";

interface TransactionStatusBadgeProps {
    status: string;
}

export function TransactionStatusBadge({
    status,
}: TransactionStatusBadgeProps) {
    switch (status.toLowerCase()) {
        case "approved":
        case "active":
        case "paid":
            return (
                <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50"
                >
                    Concluído
                </Badge>
            );
        case "pending":
        case "process":
            return (
                <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50"
                >
                    Pendente
                </Badge>
            );
        case "rejected":
        case "inactive":
            return (
                <Badge
                    variant="outline"
                    className="bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50"
                >
                    Rejeitado
                </Badge>
            );
        default:
            return (
                <Badge
                    variant="outline"
                    className="bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                >
                    {status === "paid" ? "Pago" : "Desconhecido"}
                </Badge>
            );
    }
}

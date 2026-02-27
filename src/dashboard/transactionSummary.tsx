import { formatCurrency } from "@/utils/formatters";
import { Card, CardContent } from "../components/ui/card";
import { RecentTransaction } from "./RecentTransactions";
import { useUser } from "@/contexts/UserProvider";

export function TransactionSummary({
    transactions,
}: {
    transactions: RecentTransaction[];
}) {
    const { user } = useUser();
    // Calcula totais por tipo
    const summary = transactions.reduce(
        (acc, transaction) => {
            // Garante que amount seja um número
            const amount = parseFloat(
                transaction.amount.toString().replace(/[^\d.-]/g, "")
            );

            // Entradas (deposits e comissões aprovadas/completadas)
            if (
                ["approved", "active", "completed"].includes(
                    transaction.status
                ) &&
                ["deposit", "commission"].includes(transaction.type)
            ) {
                acc.totalIncome += amount;
            }

            // Saídas (withdrawals e purchases não rejeitados)
            if (
                ["withdrawal", "purchase"].includes(transaction.type) &&
                transaction.status !== "rejected"
            ) {
                acc.totalExpense += amount;
            }

            // Pendentes (apenas transações com status pending ou process)
            if (
                ["pending", "process"].includes(transaction.status) &&
                ["withdrawal", "commission", "purchase"].includes(
                    transaction.type
                )
            ) {
                acc.totalPending += amount;
            }

            return acc;
        },
        { totalIncome: 0, totalExpense: 0, totalPending: 0 }
    );

    console.log("summario total: ", summary);
    const balance = user?.balance;

    return (
        <div className="grid grid-cols-1 mt-5 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Entradas
                    </p>
                    <h3 className="text-xl font-bold mt-1">
                        {formatCurrency(summary.totalIncome)}
                    </h3>
                </CardContent>
            </Card>
            <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        Saídas
                    </p>
                    <h3 className="text-xl font-bold mt-1">
                        {formatCurrency(summary.totalExpense)}
                    </h3>
                </CardContent>
            </Card>
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Saldo
                    </p>
                    <h3
                        className={`text-xl font-bold mt-1 ${
                            balance && balance >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                        }`}
                    >
                        {formatCurrency(balance ?? 0)}
                    </h3>
                </CardContent>
            </Card>
            <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-4">
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        Pendente
                    </p>
                    <h3 className="text-xl font-bold mt-1">
                        {formatCurrency(summary.totalPending)}
                    </h3>
                </CardContent>
            </Card>
        </div>
    );
}

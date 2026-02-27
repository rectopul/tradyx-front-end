import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Transaction, TransactionSummaryData } from "@/types/transaction";
import {
    calculateTransactionSummary,
    formatCurrency,
} from "@/utils/transactionUtils";
import {
    ArrowUpRight,
    ArrowDownRight,
    ShoppingCart,
    Award,
    TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

interface TransactionSummaryCardProps {
    transactions: Transaction[];
}

export function TransactionSummaryCard({
    transactions,
}: TransactionSummaryCardProps) {
    const summary: TransactionSummaryData =
        calculateTransactionSummary(transactions);

    const summaryItems = [
        {
            title: "Depósitos",
            value: summary.totalDeposits,
            icon: ArrowUpRight,
            color: "text-emerald-500",
            bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
        },
        {
            title: "Saques",
            value: summary.totalWithdrawals,
            icon: ArrowDownRight,
            color: "text-rose-500",
            bgColor: "bg-rose-50 dark:bg-rose-950/30",
        },
        {
            title: "Investimentos",
            value: summary.totalPurchases,
            icon: ShoppingCart,
            color: "text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-950/30",
        },
        {
            title: "Comissões",
            value: summary.totalCommissions,
            icon: Award,
            color: "text-purple-500",
            bgColor: "bg-purple-50 dark:bg-purple-950/30",
        },
        {
            title: "Saldo Total",
            value: summary.netBalance,
            icon: TrendingUp,
            color:
                summary.netBalance >= 0 ? "text-emerald-500" : "text-rose-500",
            bgColor:
                summary.netBalance >= 0
                    ? "bg-emerald-50 dark:bg-emerald-950/30"
                    : "bg-rose-50 dark:bg-rose-950/30",
        },
    ];

    // Calculate the maximum value for percentage calculations
    const maxValue = Math.max(
        summary.totalDeposits,
        summary.totalWithdrawals,
        summary.totalPurchases,
        summary.totalCommissions,
        Math.abs(summary.netBalance)
    );

    return (
        <Card className="border-blue-100 dark:border-blue-900/30 shadow-sm mb-6">
            <CardHeader className="border-b border-blue-50 dark:border-blue-950/20 pb-4">
                <CardTitle className="text-blue-950 dark:text-blue-50">
                    Resumo Financeiro
                </CardTitle>
                <CardDescription>
                    Visão geral das suas movimentações
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {summaryItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white dark:bg-blue-950/10 rounded-lg border border-blue-100 dark:border-blue-950/30 p-4 relative overflow-hidden"
                        >
                            {/* Progress bar in background */}
                            <div
                                className={`absolute bottom-0 left-0 h-1 ${item.bgColor}`}
                                style={{
                                    width: `${Math.min(
                                        100,
                                        (Math.abs(item.value) / maxValue) * 100
                                    )}%`,
                                    transition: "width 1s ease-in-out",
                                }}
                            />

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    {item.title}
                                </h3>
                                <div
                                    className={`p-2 rounded-full ${item.bgColor}`}
                                >
                                    <item.icon
                                        className={`h-4 w-4 ${item.color}`}
                                    />
                                </div>
                            </div>
                            <p
                                className={`text-lg font-semibold ${item.color}`}
                            >
                                {formatCurrency(item.value)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

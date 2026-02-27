import { Clock } from "lucide-react";
import { Transaction } from "@/types/transaction";
import { TransactionTypeIcon } from "./TransactionTypeIcon";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/transactionUtils";
import { motion } from "framer-motion";

interface TransactionItemProps {
    transaction: Transaction;
    index: number;
}

export function TransactionItem({ transaction, index }: TransactionItemProps) {
    const isNegative =
        transaction.type === "withdraw" || transaction.type === "purchase";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={cn(
                "flex items-center justify-between rounded-lg border p-4 transition-all",
                "hover:bg-blue-50/50 dark:hover:bg-blue-950/10",
                "border-blue-100 dark:border-blue-950/30",
                "bg-white dark:bg-background/60"
            )}
        >
            <div className="flex items-center space-x-4">
                <div
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        "bg-blue-100 dark:bg-blue-900/30",
                        "shadow-sm"
                    )}
                >
                    <TransactionTypeIcon type={transaction.type} size="md" />
                </div>

                <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                        {transaction.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{transaction.created_at}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1">
                <span
                    className={cn(
                        "font-medium text-sm md:text-base",
                        isNegative
                            ? "text-rose-500 dark:text-rose-400"
                            : "text-emerald-500 dark:text-emerald-400"
                    )}
                >
                    {isNegative ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                </span>
                <TransactionStatusBadge status={transaction.status} />
            </div>
        </motion.div>
    );
}

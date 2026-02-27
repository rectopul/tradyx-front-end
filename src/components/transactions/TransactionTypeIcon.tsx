import {
    ArrowUpRight,
    ArrowDownRight,
    ShoppingCart,
    Award,
    PiggyBank,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TransactionType } from "@/types/transaction";
import { getTransactionColor } from "@/utils/transactionUtils";

interface TransactionTypeIconProps {
    type: TransactionType;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function TransactionTypeIcon({
    type,
    size = "md",
    className,
}: TransactionTypeIconProps) {
    const sizeClasses = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    };

    const iconClass = cn(
        sizeClasses[size],
        getTransactionColor(type),
        className
    );

    switch (type) {
        case "deposit":
            return <ArrowUpRight className={iconClass} />;
        case "withdraw":
            return <ArrowDownRight className={iconClass} />;
        case "purchase":
            return <ShoppingCart className={iconClass} />;
        case "commission":
            return <Award className={iconClass} />;
        default:
            return <PiggyBank className={iconClass} />;
    }
}

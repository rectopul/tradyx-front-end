import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { cn } from "../lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ReactNode;
    trend?: {
        value: number;
        positive: boolean;
    };
    className?: string;
}

export function StatCard({
    title,
    value,
    description,
    icon,
    trend,
    className,
}: StatCardProps) {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
                {trend && (
                    <div
                        className={cn(
                            "mt-2 flex items-center text-xs",
                            trend.positive ? "text-green-500" : "text-red-500"
                        )}
                    >
                        <span>{trend.positive ? "↑" : "↓"}</span>
                        <span className="ml-1">
                            {trend.value}% em relação ao mês anterior
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

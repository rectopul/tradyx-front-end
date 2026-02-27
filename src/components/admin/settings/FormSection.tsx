import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
    title,
    description,
    children,
    className,
}) => {
    return (
        <Card
            className={cn(
                "transition-all duration-200 hover:shadow-md",
                className
            )}
        >
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                    {title}
                </CardTitle>
                {description && (
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                )}
            </CardHeader>
            <CardContent className="space-y-6">{children}</CardContent>
        </Card>
    );
};

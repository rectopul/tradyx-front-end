import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
// import { formatDate, getStatusColor, formatStatus } from "";

export interface Column {
    field: string;
    label: string;
    format?: (value: any) => React.ReactNode;
}

export interface Sort {
    field: string;
    direction: "asc" | "desc";
}

export interface TransactionTableProps {
    data: Array<Record<string, any>>;
    page: number;
    itemsPerPage: number;
    sort: Sort;
    onSort: (field: string) => void;
    onPageChange: (page: number) => void;
    columns: Column[];
}

const TransactionTable = ({
    data,
    page,
    itemsPerPage,
    sort,
    onSort,
    onPageChange,
    columns,
}: TransactionTableProps) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const sortedData = [...data].sort((a, b) => {
        const direction = sort.direction === "asc" ? 1 : -1;
        return a[sort.field] > b[sort.field] ? direction : -direction;
    });

    const paginatedData = sortedData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            {columns.map((column) => (
                                <th
                                    key={column.field}
                                    className="text-left p-2"
                                >
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onSort(column.field)}
                                        className="flex items-center gap-1"
                                    >
                                        {column.label}
                                        <ArrowUpDown className="h-4 w-4" />
                                    </Button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50 dark:hover:bg-slate-400/10"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={`${item.id}-${column.field}`}
                                        className="p-2"
                                    >
                                        {column.format
                                            ? column.format(item[column.field])
                                            : item[column.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                >
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default TransactionTable;

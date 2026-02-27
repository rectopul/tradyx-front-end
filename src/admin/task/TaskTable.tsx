import { MoreHorizontal, MessageSquare, Eye, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Withdrawal } from "@/types";
import { formatCurrency } from "@/utils/helpers";
import { BadgeType } from "@/components/admin/withdraw/list/columns";

interface TaskTableProps {
    tasks: Withdrawal[];
    section: "todo" | "active";
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case "pending":
            return <Badge variant="info">In Review</Badge>;
        case "processing":
            return <Badge variant="warning">In Progress</Badge>;
        case "completed":
            return <Badge variant="success">Completed</Badge>;
        case "rejected":
            return <Badge variant="secondary">Drafts</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

const calculatePercentOfBalance = (balance: number, value: number) => {
    if (balance <= 0) return 0;
    return Number(((value / balance) * 100).toFixed(2));
};

const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-red-500";
};

export function TaskTable({ tasks, section }: TaskTableProps) {
    const sectionTitle = section === "todo" ? "TODO" : "ACTIVE PROJECTS";

    return (
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {sectionTitle}
                    </h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View All</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                        {tasks.map((task) => (
                            <tr
                                key={task.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                {task.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {formatCurrency(task.amount)}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            12
                                        </span>
                                        <Eye className="h-4 w-4 text-gray-400 ml-2" />
                                        <span className="text-sm text-gray-600">
                                            21
                                        </span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    {getStatusBadge(task.status)}
                                </td>

                                <td className="px-6 py-4">
                                    {BadgeType(task.status)}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">
                                        {task.created_at} Days left
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all ${getProgressColor(
                                                        calculatePercentOfBalance(
                                                            task.user
                                                                ?.balance ?? 0,
                                                            task.amount
                                                        )
                                                    )}`}
                                                    style={{
                                                        width: `${calculatePercentOfBalance(
                                                            task.user
                                                                ?.balance ?? 0,
                                                            task.amount
                                                        )}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-600 min-w-[3rem]">
                                            {calculatePercentOfBalance(
                                                task.user?.balance ?? 0,
                                                task.amount
                                            )}
                                            %
                                        </span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                Edit Task
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Archive
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {section === "active" && (
                <div className="px-6 py-4 border-t border-gray-200">
                    <Button variant="outline" className="w-full gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Project
                    </Button>
                </div>
            )}
        </div>
    );
}

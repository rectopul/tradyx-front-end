import {
    Filter,
    ArrowUpDown,
    EyeOff,
    MoreHorizontal,
    Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskFiltersProps {
    onSortChange: (sort: string) => void;
}

export function TaskFilters({ onSortChange }: TaskFiltersProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                {/* Filter Button */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem>All Tasks</DropdownMenuItem>
                        <DropdownMenuItem>In Progress</DropdownMenuItem>
                        <DropdownMenuItem>Completed</DropdownMenuItem>
                        <DropdownMenuItem>High Priority</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort Button */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <ArrowUpDown className="h-4 w-4" />
                            Sort
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem
                            onClick={() => onSortChange("dueDate")}
                        >
                            Due Date
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onSortChange("priority")}
                        >
                            Priority
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onSortChange("status")}
                        >
                            Status
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSortChange("name")}>
                            Name
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Hide Button */}
                <Button variant="outline" size="sm" className="gap-2">
                    <EyeOff className="h-4 w-4" />
                    Hide
                </Button>

                {/* More Options */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem>Export Tasks</DropdownMenuItem>
                        <DropdownMenuItem>Import Tasks</DropdownMenuItem>
                        <DropdownMenuItem>Bulk Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* New Project Button */}
            <Button className="gap-2 bg-gray-900 hover:bg-gray-800">
                <Plus className="h-4 w-4" />
                New Project
            </Button>
        </div>
    );
}

export interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    status: "todo" | "in-progress" | "in-review" | "completed";
    priority: "low" | "medium" | "high";
    daysLeft: number;
    progress: number;
    assignee?: {
        name: string;
        avatar: string;
    };
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskFilters {
    status: string[];
    priority: string[];
    category: string[];
    search: string;
}

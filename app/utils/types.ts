export type ProjectStatus = 'approved' | 'pending' | 'rejected' | 'completed';

export type Project = {
    id: number;
    tenant_id: number;
    name: string;
    slug: string;
    description: string | null;
    owner_id: number;
    status: ProjectStatus;
    start_date: string; // e.g., "2025-11-15"
    end_date: string;   // e.g., "2026-02-28"
    budget_allocated: string; // Stored as a string if currency/decimal precision is important
    spent_amount: string;     // Stored as a string
    meta: any; // Type this more specifically if the structure of `meta` is known
};

export type TaskType = 'task' | 'bug' | 'feature' | 'story';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskItem = {
    tenant_id: number;
    project_id: number;
    milestone_id: number | null;
    title: string;
    description: string | null;
    type: TaskType;
    assignee_id: number;
    reporter_id: number;
    status: TaskStatus;
    priority: TaskPriority;
    estimated_hours: number | null;
    actual_hours: number | null;
    id: number;
};


export type Document = {
    name:string,
    user_id:string,
    documentable_id:number,
    documentable_type:string,
    tenant_id:number,
    document_file:File | null
}
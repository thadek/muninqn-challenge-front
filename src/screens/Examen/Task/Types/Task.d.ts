export interface UserPivot {
    task_id: number;
    user_id: number;
    is_finished: number;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    dni: string;
    pivot: UserPivot;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    created_at: string;
    updated_at: string;
    users: User[];
}
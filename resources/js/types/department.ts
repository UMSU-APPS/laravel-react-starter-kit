export interface DepartmentData {
    id: number;
    code: string;
    name: string;
    parent_id?: number;
    parent?: {
        id: number;
        name: string;
        code: string;
    };
    children?: DepartmentData[];
    head_id?: number;
    head?: {
        id: number;
        full_name: string;
        nip: string;
    };
    is_active: boolean;
    created_at: string;
}

export interface DepartmentOption {
    id: number;
    name: string;
    code: string;
    parent_id?: number;
}

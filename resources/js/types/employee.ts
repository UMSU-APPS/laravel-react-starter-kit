export interface EmployeeData {
    id: number;
    nip: string;
    nik: string;
    npwp?: string;
    full_name: string;
    nickname?: string;
    email: string;
    phone_number?: string;
    gender: 'L' | 'P';
    place_of_birth?: string;
    date_of_birth?: string;
    address?: string;
    blood_type?: string;
    position_id?: number;
    position?: {
        id: number;
        name: string;
        code: string;
    };
    employment_status: 'permanent' | 'contract' | 'probation' | 'internship';
    work_unit: 'akademik' | 'non-akademik';
    join_date: string;
    exit_date?: string;
    is_active: boolean;
    basic_salary?: number;
    bank_name?: string;
    bank_account_number?: string;
    bank_account_holder?: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
    created_at: string;
}

export interface PositionOption {
    id: number;
    name: string;
    code: string;
}

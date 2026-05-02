export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type MenuItem = {
    id: number;
    name: string;
    url: string;
    category?: string;
    icon?: string;
    active: boolean;
    orders: number;
    main_menu_id?: number;
    sub_menus?: MenuItem[];
};

export type Auth = {
    user: User;
    sidebar: MenuItem[];
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};

export type SharedData = {
    auth: Auth;
    [key: string]: unknown;
};

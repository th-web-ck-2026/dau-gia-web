export interface User {
    id: string;
    email: string;
    name: string;
    role?: string;
    permissions?: string[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

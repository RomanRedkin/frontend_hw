export interface AuthFormData {
    email: string;
    password: string;
}

export type LoginFormData = AuthFormData;

export type RegisterFormData = AuthFormData;

export interface AuthUser {
    id: number;
    email: string;
}

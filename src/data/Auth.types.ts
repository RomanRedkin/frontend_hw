export interface AuthFormData {
    email: string;
    password: string;
}

export type LoginFormData = AuthFormData;

export interface RegisterFormData extends AuthFormData {
    confirmPassword: string;
}

export interface AuthUser {
    id: number;
    email: string;
}

export interface ApiError {
    message: string;
}

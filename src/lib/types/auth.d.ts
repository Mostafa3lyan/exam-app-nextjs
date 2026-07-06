export interface LoginResponse  {
    token: string;
    user: myUser;
}
export interface RegisterResponse {
    user: myUser;
}

export interface myUser {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: Date;
}

export interface LoginFields  {
    username: string;
    password: string;
}
export interface RegisterFields {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export type EmailField = {
    email: string;
};

export type EmailOtpFields = {
    email: string;
    code: string;
};
export type ForgotPasswordProps = {
    email?: string
    onSuccess: (email: string) => void
}

export type VerifyResetFields = {
    resetCode: string;
};

export type ResetPasswordData = {
    token: string;
    newPassword: string;
    confirmPassword: string;
}
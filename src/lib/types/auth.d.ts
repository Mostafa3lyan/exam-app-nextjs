export interface LogainResponse  {
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
    email: string;
    password: string;
}
export interface RegisterFields {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    rePassword: string;
}
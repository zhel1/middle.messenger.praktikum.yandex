export type ApiError = {
    reason: string;
};

export type IUser = {
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
    login?: string;
    password?: string;
    display_name?: string;
    avatar?: string;
    id?:string
}

export type SignUpResponse = {
    id: number
}

export type SignInInput = {
    login: string;
    password: string;
}

export type GetUserInput = {
    login: string;
    password: string;
}

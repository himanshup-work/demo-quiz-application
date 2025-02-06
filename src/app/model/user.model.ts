// models/user.model.ts

// Interface for the form data
export interface IUserRegistration {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    image: string;
}

// Interface for the API response
export interface IApiResponse {
    status: boolean;
    message: string;
    data?: any;
}

// Interface for the user data received from backend
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILoggedInUser {
    userId: string;
    userRole: string;
}
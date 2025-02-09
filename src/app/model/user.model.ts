// models/user.model.ts

// Interface for the form data
export interface IUserRegistration {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    image: string;
}

export class IUserUpdate {
    userId!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    username!: string;
    bio!: string;    
    image!: string;

    public setUserId(userId: string){
        this.userId = userId;
    }
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
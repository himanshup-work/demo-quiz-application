export interface IAuthRequest {
    email: string;
    password: string;
}

export interface IAuthResponse {
    token: string;
    userId: string;
    userRole: string;
}

// Interface for the API response
export interface IApiResponse<T> {
    status: boolean;
    message: string;
    data?: any;
}
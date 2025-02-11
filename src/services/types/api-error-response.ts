export interface ApiError {
    code: number;
    status: string;
    message: string;
    errors?: Record<string, string>;
}
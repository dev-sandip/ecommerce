export type SuccessResponse<T> = {
    message: string;
    status: number;
    statusText: string;
    data: T;
};
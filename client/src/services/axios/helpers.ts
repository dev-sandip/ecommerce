import axios, { AxiosResponse } from "axios";

import { SuccessResponse } from "./types";

export const parseApiError = (
    error: unknown,
    defaultMessage = "Unable to process your request"
): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || defaultMessage;
    }

    return defaultMessage;
};

export const parseError = (
    error: unknown,
    defaultMessage = "Some Error Occurred"
): string => {
    if (typeof error === "string") return error;

    if (error instanceof Error) {
        return error.message;
    }

    if ("message" in (error as { message: string })) {
        return (error as { message: string }).message;
    }

    return parseApiError(error, defaultMessage);
};

export const parseApiSuccessMessage = (
    res: AxiosResponse<SuccessResponse<unknown>>,
    defaultMessage = "Operation successful!"
) => {
    return res.data.message || defaultMessage;
};

export const extractResponseData = <T>(
    res: AxiosResponse<SuccessResponse<T>>
) => res.data.data;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginSchema, RegisterSchema } from "@/schemas/auth-schema"

import axios from "./axios/axios";
import { API_URL } from ".";

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: (data: typeof LoginSchema): Promise<string> => {
                return new Promise((resolve, reject) => {
                    axios.post(API_URL.LOGIN, data)
                        .then((res) => {

                            queryClient.invalidateQueries({
                                queryKey: ["session"]
                            })
                            resolve(res.data?.message ?? "Welcome to Trendify");
                        })
                        .catch((error) => {
                            reject(
                                error?.response?.data?.message ?? "Failed to signin, Try Again!"
                            );
                        });


                });
            },
            onSuccess: (message) => toast.success(message),
            onError: (message: string) => toast.success(message),
        });
}

export const useRegister = () => {

    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: (data: typeof RegisterSchema): Promise<string> => {
                return new Promise((resolve, reject) => {
                    axios.post(API_URL.REGISTER, data)
                        .then((res) => {

                            queryClient.invalidateQueries({
                                queryKey: ["session"]
                            })
                            resolve(res.data?.message ?? "Welcome to Trendify");
                        })
                        .catch((error) => {
                            reject(
                                error?.response?.data?.message ?? "Failed to signin, Try Again!"
                            );
                        });


                });
            },
            onSuccess: (message) => toast.success(message),
            onError: (message: string) => toast.success(message),
        });
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginSchema, RegisterSchema } from "@/schemas/auth-schema"
import axios from "../axios/axios";
import { API_URL } from "../index";
import { IUser, SessionResponse } from "@/types";

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
                            if (res.data.user.isAdmin) {
                                window.location.href = "/dashboard"
                            } else {
                                window.location.href = "/"
                            }
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
                            resolve(res.data?.message ?? `Welcome to Trendify!`);
                            if (res.data.user.isAdmin) {
                                window.location.href = "/dashboard"
                            } else {
                                window.location.href = "/"
                            }
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

export const useUserSession = () => {
    return useQuery({
        queryKey: ['user', 'session'],
        queryFn: () => {
            return new Promise<IUser>((resolve, reject) => {
                axios.get<SessionResponse>(API_URL.USER_SESSION)
                    .then((response) => {
                        if (response.data?.user) {
                            resolve(response.data.user);
                        } else {
                            reject(new Error(response.data.message || "User session not found"));
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to fetch user session:", error);
                        reject(new Error(error?.response?.data?.message || "Failed to fetch user session"));
                    });
            });
        },
        retry: 0,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
};
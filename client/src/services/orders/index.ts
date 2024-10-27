import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../axios/axios";
import { API_URL } from "../index";
import { toast } from "sonner";
import { IOrder } from "@/schemas/order-schema";
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IOrder): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios.post(API_URL.CREATE_ORDER, data)
          .then((res) => {
            queryClient.invalidateQueries({
              queryKey: ['orders']
            });
            resolve(res.data.message ?? "Order created successfully");
          })
          .catch((error) => {
            console.log(error)
            reject(error?.response?.data?.message ?? "Failed to create order, try again!");
          });
      });
    },
    onError: (message: string) => toast.error(message)
  })
}




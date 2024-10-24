import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../axios/axios";
import { API_URL } from "../index";
import { toast } from "sonner";


export const useGetProducts = () => {
  return useQuery({
    queryKey: ['fetched-products'],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        axios.get(API_URL.PRODUCTS)
          .then((response) => {
            resolve(response.data.products);
          })
          .catch((error) => {
            console.error("Failed to fetch products:", error);
            reject(new Error("Failed to fetch products, try again!"));
          });
      });
    },
  });
};
export const useGetSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        axios.get(`${API_URL.PRODUCTS}/${id}`)
          .then((response) => {
            resolve(response.data.product);
          })
          .catch((error) => {
            console.error("Failed to fetch product:", error);
            reject(new Error("Failed to fetch product, try again!"));
          });
      });
    },
  });
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios.post(API_URL.CREATE_PRODUCT, data)
          .then((res) => {
            queryClient.invalidateQueries({
              queryKey: ['products']
            });
            resolve(res.data.message ?? "Product created successfully");
          })
          .catch((error) => {
            console.log(error)
            reject(error?.response?.data?.message ?? "Failed to create product, try again!");
          });
      });
    },
    onError: (message: string) => toast.error(message),
    onSuccess: (message) => toast.success(message),
  });
}
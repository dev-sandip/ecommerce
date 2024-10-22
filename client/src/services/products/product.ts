import { useQuery } from "@tanstack/react-query";
import axios from "../axios/axios";
import { API_URL } from "../index";
import type { Product } from '@/schemas/product-schema';

type ProductsResponse = {
  products: Product[];
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => {
      return new Promise<ProductsResponse>((resolve, reject) => {
        axios.get<ProductsResponse>(API_URL.PRODUCTS)
          .then((response) => {
            resolve(response.data);
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
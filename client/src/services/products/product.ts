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
    queryFn: async () => {
      try {
        const response = await axios.get<ProductsResponse>(API_URL.PRODUCTS);
        return response.data;
      } catch (error: unknown) {
        console.error("Failed to fetch products:", error);
        throw new Error("Failed to fetch products, try again!");
      }
    },
  });
};

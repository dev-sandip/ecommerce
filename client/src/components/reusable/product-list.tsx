// components/product/ProductList.tsx
import { useGetProducts } from "@/services/products/product";
import ProductCard from "./product-card";

import { toast } from "sonner";
import Link from "next/link";
import { Product } from "@/schemas/product-schema";
import { ProductListSkeleton } from "./skeletons/ProductListSkeleton";

interface ProductWithID extends Product {
  _id: string;
}

export default function ProductList() {
  const { data, error, isLoading } = useGetProducts();
  const products = data as ProductWithID[];
  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (error) {
    toast.error(error.message);
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900"> Sorry, Failed to load products.</h2>
        <p className="text-gray-600 mt-2">Please try again later!</p>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">No products found.</h2>
        <p className="text-gray-600 mt-2">Check back later for new products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/products/${product._id}`}
          className="transition-transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none"
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
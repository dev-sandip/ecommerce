import { useGetProducts } from "@/services/products/product";
import ProductCard from "./product-card";
import { toast } from "sonner";

export default function ProductList() {
  const { data, error, isLoading } = useGetProducts();


  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return toast.error(error.message);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

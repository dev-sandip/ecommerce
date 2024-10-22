import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const ProductListSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);
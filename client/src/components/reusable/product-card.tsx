/* eslint-disable @next/next/no-img-element */
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/schemas/product-schema';

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const { title, price, thumbnail } = product;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {thumbnail?.url && (
        <img
          src={thumbnail.url}
          alt={title || "Product Image"}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">
          Rs.{typeof price === 'number' ? price.toFixed(2) : 'N/A'}
        </p>
        <Button className="w-full" aria-label={`Add ${title} to Cart`}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard'; // Helpful for debugging in React DevTools

export default ProductCard;

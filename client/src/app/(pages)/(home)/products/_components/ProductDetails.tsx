import { useState, useMemo } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Product } from '@/schemas/product-schema';
import { StarRating } from './StarRating';
import { useCartStore } from '@/store/cart';
import { IProduct } from '@/types';

interface ProductWithID extends Product {
  _id: string;
}
interface ProductDetailsProps {
  product: ProductWithID;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const discountedPrice = useMemo(() =>
    product.price * (1 - product.discountPercentage / 100),
    [product.price, product.discountPercentage]
  );

  const maxQuantity = useMemo(() =>
    Math.min(10, product.stock),
    [product.stock]
  );

  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state: { addItem: (item: IProduct, quantity: number) => void }) => state.addItem);
  const handleAddToCart = () => {
    addItem(product as IProduct, quantity);
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} of ${product.title} to cart`);
  };
  console.log("Item from store", useCartStore.getState().items)
  const handleWishlist = () => {
    toast.success('Added to wishlist');
    // Add your wishlist logic here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-lg text-gray-600">{product.brand}</p>
      </div>

      <StarRating rating={product.rating} />

      <div>
        <p className="text-3xl font-bold">Rs.{discountedPrice.toFixed(2)}</p>
        {product.discountPercentage > 0 && (
          <p className="text-lg text-gray-600">
            <span className="line-through">Rs {product.price.toFixed(2)}</span>{' '}
            <Badge variant="destructive">
              {product.discountPercentage}% OFF
            </Badge>
          </p>
        )}
      </div>

      <p className="text-gray-700">{product.description}</p>

      <div className="space-y-2">
        <p className="font-semibold">
          Category: <span className="font-normal">{product.category}</span>
        </p>
        <p className="font-semibold">
          Stock:{' '}
          <span className="font-normal">
            {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </span>
        </p>
      </div>

      {product.stock > 0 && (
        <div className="flex items-center space-x-4">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded-md p-2"
            aria-label="Select quantity"
          >
            {[...Array(maxQuantity)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <Button className="flex-1" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button variant="outline" size="icon" onClick={handleWishlist}>
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
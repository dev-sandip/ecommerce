'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useGetSingleProduct } from '@/services/products/product';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { ProductImages } from '../_components/productImages';
import { LoadingSkeleton } from '../_components/LoadingSkeleton';
import { ProductDetails } from '../_components/ProductDetails';
import { Product } from '@/schemas/product-schema';
export default function ProductPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProduct(id as string);
  const product: Product = data as Product;
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    toast.error('Failed to load product');
    return null;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-gray-600 mt-2">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ProductImages
          images={product.images}
          thumbnail={product.thumbnail}
          title={product.title}
        />
        <ProductDetails product={product} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <Card>
          <CardContent className="grid sm:grid-cols-2 gap-4 p-6">
            {[
              { label: 'Brand', value: product.brand },
              { label: 'Category', value: product.category },
              { label: 'Stock', value: product.stock },
              { label: 'Rating', value: product.rating }
            ].map(({ label, value }) => (
              <div key={label}>
                <h3 className="font-semibold">{label}</h3>
                <p>{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
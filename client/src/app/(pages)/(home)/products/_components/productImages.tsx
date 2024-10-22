import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/schemas/product-schema';

interface ProductImagesProps {
  images: Product['images'];
  thumbnail: Product['thumbnail'];
  title: string;
}

export const ProductImages = ({ images, thumbnail, title }: ProductImagesProps) => {
  const [mainImage, setMainImage] = useState<string>(thumbnail?.url || '/placeholder.svg');

  return (
    <div className="space-y-4">
      <div className="relative aspect-square">
        <Image
          src={mainImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image.fileId || index}
            onClick={() => setMainImage(image.url || '/placeholder.svg')}
            className="relative aspect-square overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={`${title} - Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 12vw"
              className="object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
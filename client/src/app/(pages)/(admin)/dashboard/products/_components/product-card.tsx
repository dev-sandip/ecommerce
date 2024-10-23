/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import { Product } from '@/schemas/product-schema'
import { Edit, Trash2 } from 'lucide-react'

const ProductCard = ({ product, onEdit, onDelete }: { product: Product; onEdit: (id: string) => void; onDelete: (id: string) => void }) => {
  const { id, title, price, thumbnail } = product

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
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1" onClick={() => id && onEdit(id)} aria-label={`Edit ${title}`}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" className="flex-1" onClick={() => id && onDelete(id)} aria-label={`Delete ${title}`}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard;
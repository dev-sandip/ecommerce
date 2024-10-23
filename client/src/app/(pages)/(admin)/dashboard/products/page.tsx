'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Product } from '@/schemas/product-schema'
import Link from 'next/link'
import { Search, Plus, } from 'lucide-react'
import ProductCard from './_components/product-card'
import { useGetProducts } from '@/services/products/product'
import { ProductListSkeleton } from '@/components/reusable/skeletons/ProductListSkeleton'
import { toast } from 'sonner'
interface ProductWithID extends Product {
  _id: string;
}



export default function ProductPage() {
  const { data, error, isLoading } = useGetProducts();
  const products = data as ProductWithID[];
  const [searchTerm, setSearchTerm] = useState('')

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


  const handleEdit = (id: string) => {
    // TODO:Implement edit functionality
    console.log(`Editing product with id: ${id}`)
  }

  const handleDelete = (id: string) => {
    //TODO: Implement delete functionality
    console.log(`Deleting product with id: ${id}`)
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white relative flex-1 max-w-xl">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Link href="/dashboard/create" passHref>
          <Button className="ml-4">
            <Plus className="w-4 h-4 mr-2" />
            New Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </div>
  )
}
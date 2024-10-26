'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { DollarSign, Tag, Star, Package, X } from 'lucide-react'
import { productSchema } from '@/schemas/product-schema'
import Image from 'next/image'
import { useCreateProduct } from '@/services/products/product'

type ProductFormData = z.infer<typeof productSchema>

export default function ProductCreationForm() {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [imagesPreview, setImagesPreview] = useState<Array<{ file: File; preview: string }>>([])

  const { register, handleSubmit, control, formState: { errors }, watch, reset, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      discountPercentage: 0,
      rating: 0,
      images: [],
    },
  })

  const watchFields = watch()

  const { mutate, isPending, isSuccess } = useCreateProduct()
  const onSubmit = (data: ProductFormData) => {
    const fd = new FormData()
    fd.append('title', data.title)
    fd.append('description', data.description)
    fd.append('price', data.price.toString())
    fd.append('discountPercentage', data.discountPercentage.toString())
    fd.append('rating', data.rating.toString())
    fd.append('stock', data.stock.toString())
    fd.append('brand', data.brand)
    fd.append('category', data.category)
    fd.append('thumbnail', data.thumbnail)
    data.images.forEach((image) => {
      fd.append(`images[]`, image)
    })
    mutate(fd)
  }


  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue('thumbnail', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newPreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImagesPreview(prev => [...prev, ...newPreviews])
    setValue('images', [...watchFields.images, ...files])
  }

  const removeImage = (index: number) => {
    setImagesPreview(prev => prev.filter((_, i) => i !== index))
    setValue('images', watchFields.images.filter((_, i) => i !== index))
  }
  if (isSuccess) {
    reset()
    setThumbnailPreview(null)
    setImagesPreview([])
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Product</CardTitle>
      </CardHeader>
      <CardContent>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter product title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            <p className="text-sm text-muted-foreground">At least 3 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Enter product description"
              className={`min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            <p className="text-sm text-muted-foreground">{watchFields.description?.length || 0} characters</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  placeholder="0.00"
                  className={`pl-10 ${errors.price ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              <p className="text-sm text-muted-foreground">Enter a valid price</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercentage">Discount (%)</Label>
              <Input
                id="discountPercentage"
                type="number"
                min="0"
                max="100"
                step="1"
                {...register('discountPercentage', { valueAsNumber: true })}
                placeholder="0"
                className={errors.discountPercentage ? 'border-red-500' : ''}
              />
              {errors.discountPercentage && <p className="text-red-500 text-sm">{errors.discountPercentage.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="relative">
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="rating"
                  type="number"
                  step="0.5"
                  min="0"
                  max="5"
                  {...register('rating', { valueAsNumber: true })}
                  placeholder="0.0"
                  className={`pl-10 ${errors.rating ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="stock"
                  type="number"
                  {...register('stock', { valueAsNumber: true })}
                  placeholder="0"
                  className={`pl-10 ${errors.stock ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                {...register('brand')}
                placeholder="Enter brand name"
                className={errors.brand ? 'border-red-500' : ''}
              />
              {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`pl-10 ${errors.category ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Apparel">Apparel</SelectItem>
                        <SelectItem value="Home">Home & Garden</SelectItem>
                        <SelectItem value="Beauty">Beauty & Personal Care</SelectItem>
                        <SelectItem value="Sports">Sports & Outdoors</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className={errors.thumbnail ? 'border-red-500' : ''}
              />
              {thumbnailPreview && (
                <div className="w-20 h-20 relative">
                  <Image src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover rounded" width={100} height={100} />
                </div>
              )}
            </div>
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Product Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className={errors.images ? 'border-red-500' : ''}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {imagesPreview.map((preview, index) => (
                <div key={index} className="w-20 h-20 relative group">
                  <Image src={preview.preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded" width={100} height={100} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
          </div>

        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => reset()}>Reset</Button>
        {isPending ? <Button variant="default" disabled>Creating...</Button> : <Button variant="default" onClick={handleSubmit(onSubmit)}>Create Product</Button>}
      </CardFooter>
    </Card>
  )
}
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, Loader2, Plus } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddressFormData, AddressSchema } from '@/schemas/address-schema'
import { useCartStore } from '@/store/cart'

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<AddressFormData[]>([])
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const { items, totalAmount, totalItems } = useCartStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema),
  })

  const onSubmit = async (data: AddressFormData) => {
    setAddresses([...addresses, data])
    setSelectedAddress(addresses.length)
    reset()
    setIsAddressDialogOpen(false)
  }

  const placeOrder = async () => {
    if (selectedAddress === null) {
      setSubmitError('Please select a shipping address')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    try {
      // Here you would typically send the order data to your API
      console.log('Submitting order:', { items, shippingAddress: addresses[selectedAddress] })
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert('Order placed successfully!')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitError('An error occurred while placing your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {totalItems != 0 ? (
              items.map((item) => (
                <div key={item._id} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p>Rs {item.price}</p>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-bold">
              <p>Total</p>
              <p>Rs{totalAmount}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={placeOrder} disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`address-${index}`}
                      name="selectedAddress"
                      value={index}
                      checked={selectedAddress === index}
                      onChange={() => setSelectedAddress(index)}
                      className="form-radio"
                    />
                    <label htmlFor={`address-${index}`} className="flex-grow">
                      <p>{address.fullName}</p>
                      <p>{address.addressLine1}</p>
                      <p>{address.city}, {address.state} {address.zipCode}</p>
                      <p>{address.country}</p>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No addresses added yet. Click the button below to add an address.</p>
            )}
          </CardContent>
          <CardFooter>
            <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Address
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Address</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...register('fullName')} />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input id="addressLine1" {...register('addressLine1')} />
                    {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                    <Input id="addressLine2" {...register('addressLine2')} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" {...register('city')} />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" {...register('state')} />
                      {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input id="zipCode" {...register('zipCode')} />
                      {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" {...register('country')} />
                      {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Add Address</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
      {submitError && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, Loader2, Plus, MapPin, Package, Truck } from 'lucide-react'
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
import { discountAmount } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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
    console.log(data, "Address Data", addresses.length)
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
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert('Order placed successfully!')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitError('An error occurred while placing your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalDiscount = items.reduce((acc, item) =>
    acc + discountAmount(item.price, item.discountPercentage) * item.quantity, 0
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px] pr-4">
                {addresses.length > 0 ? (
                  <RadioGroup value={selectedAddress?.toString()} onValueChange={(value) => setSelectedAddress(parseInt(value))}>
                    {addresses.map((address, index) => (
                      <div key={index} className="flex items-start space-x-2 mb-4 p-4 border rounded-lg transition-colors hover:bg-gray-50">
                        <RadioGroupItem value={index.toString()} id={`address-${index}`} className="mt-1" />
                        <Label htmlFor={`address-${index}`} className="flex-grow cursor-pointer">
                          <p className="font-semibold">{address.fullName}</p>
                          <p className="text-sm text-gray-600">{address.addressLine1}</p>
                          <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <p className="text-center text-gray-500">No addresses added yet. Add an address to continue.</p>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add New Address
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Truck className="mr-2 h-5 w-5" />
                Delivery Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="standard">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard Delivery (3-5 business days)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">Express Delivery (1-2 business days)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Package className="mr-2 h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {totalItems !== 0 ? (
                  items.map((item) => (
                    <div key={item._id} className="flex justify-between items-center mb-4 pb-4 border-b last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                          {/* <Package className="h-8 w-8 text-gray-400" /> */}

                          
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Rs {item.price}</p>
                        <p className="text-sm text-green-600">-Rs {discountAmount(item.price, item.discountPercentage)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">Your cart is empty</p>
                )}
              </ScrollArea>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <p>Subtotal</p>
                  <p>Rs {totalAmount + totalDiscount}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600">
                  <p>Total Discount</p>
                  <p>-Rs {totalDiscount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center font-bold text-lg">
                  <p>Total</p>
                  <p>Rs {totalAmount}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={placeOrder} disabled={isSubmitting} className="w-full py-6 text-lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
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
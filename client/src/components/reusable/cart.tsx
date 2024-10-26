import React from 'react';
import { X, Plus, Minus, ShoppingCart, BaggageClaim } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import Link from 'next/link';
interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
}
const Cart = ({ isOpen, toggleCart }: CartProps) => {
  const { items, totalAmount, removeItem, updateQuantity } = useCartStore();

  const handleUpdateQuantity = (productId: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    const item = items.find(item => item._id === productId);

    if (!item) return;

    if (newQuantity <= 0) {
      removeItem(productId);
      toast.success(`${item.title} has been removed from your cart`);
      return;
    }

    if (newQuantity > item.stock) {
      toast.error("Maximum stock reached");
      return;
    }

    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast.success("Item has been removed from your cart");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR'
    }).format(price);
  };


  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-3">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 pb-4 border-b"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.thumbnail?.url || '/api/placeholder/80/80'}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium leading-none">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)}
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="mt-4">
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
                <Link href="/checkout" passHref>
                  <Button className="w-full">


                    <BaggageClaim className="w-4 h-4 mr-2" />
                    Checkout
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
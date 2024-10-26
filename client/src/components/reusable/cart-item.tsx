import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
interface CartItemProps {
  item: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
}
export default function CartItem({ item, removeFromCart, updateQuantity }: CartItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center">
        <Image src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" width={100} height={100} />
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 mr-2"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </Button>
      </div>
    </div>
  )
}
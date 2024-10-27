import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function priceAfterDiscount(price: number, discount: number) {
  return price - (price * discount) / 100
}
export function discountAmount(price: number, discount: number) {
  return (price * discount) / 100
}
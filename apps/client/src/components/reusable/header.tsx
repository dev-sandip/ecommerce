import { ShoppingCart, Search, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image';

interface HeaderProps {
    toggleCart: () => void;
    cartItemsCount: number;
}

export default function Header({ toggleCart, cartItemsCount }: HeaderProps) {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Image src="/logo.svg" alt="Store Logo" width={152} height={56} className="h-8 w-auto mr-4" />
                        <nav className="hidden md:block">
                            <ul className="flex space-x-4">
                                <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-gray-900">Products</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-gray-900">Categories</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden sm:block">
                            <Input type="search" placeholder="Search..." className="pl-10" />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        <Button onClick={toggleCart} variant="outline" className="relative">
                            <ShoppingCart size={20} />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu size={24} />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
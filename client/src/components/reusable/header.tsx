'use client'

import { useState } from 'react'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import useAuthStore from '@/store/auth'

interface HeaderProps {
    toggleCart: () => void
    cartItemsCount: number
}

export default function Header({ toggleCart, cartItemsCount }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const user = useAuthStore((state) => state.user);
    const isAdmin = useAuthStore((state) => state.isAdmin);
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" passHref>
                            <Image src="/logo.svg" alt="Store Logo" width={152} height={56} className="h-8 w-auto mr-4" />
                        </Link>
                        <nav className="hidden md:block">
                            <ul className="flex space-x-4">
                                <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                                <li><Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link></li>
                                <li><Link href="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link></li>
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
                        <div className="hidden md:flex space-x-2">
                            {user ? (
                                <Link href={isAdmin ? "/dashboard" : "/profile"} passHref>
                                    <Button variant="outline" className="text-gray-600 hover:text-gray-900">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" passHref>
                                        <Button variant="outline" className="text-gray-600 hover:text-gray-900">Login</Button>
                                    </Link>
                                    <Link href="/register" passHref>
                                        <Button className="text-white hover:text-gray-900">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden mt-4">
                        <nav>
                            <ul className="flex flex-col space-y-2">
                                <li><Link href="/" className="block py-2 text-gray-600 hover:text-gray-900">Home</Link></li>
                                <li><Link href="/products" className="block py-2 text-gray-600 hover:text-gray-900">Products</Link></li>
                                <li><Link href="/categories" className="block py-2 text-gray-600 hover:text-gray-900">Categories</Link></li>
                            </ul>
                        </nav>
                        <div className="mt-4 flex flex-col space-y-2">
                            {user ? (
                                <Link href={isAdmin ? "/dashboard" : "/profile"} passHref>
                                    <Button variant="outline" className="text-gray-600 hover:text-gray-900">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" passHref>
                                        <Button variant="outline" className="text-gray-600 hover:text-gray-900">Login</Button>
                                    </Link>
                                    <Link href="/register" passHref>
                                        <Button className="text-white hover:text-gray-900">Sign Up</Button>
                                    </Link>
                                </>
                            )}

                        </div>
                        <div className="mt-4 relative">
                            <Input type="search" placeholder="Search..." className="w-full pl-10" />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
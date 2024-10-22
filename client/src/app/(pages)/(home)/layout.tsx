"use client"
import Footer from '@/components/reusable/footer';
import Header from '@/components/reusable/header';
import React, { useState } from 'react'



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cart, setCart] = useState([])

  const toggleCart = () => setIsCartOpen(!isCartOpen)
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleCart={toggleCart} cartItemsCount={cart.length} />
      {children}
      <Footer />
    </div>
  )
}

"use client"
import Cart from '@/components/reusable/cart';
import Footer from '@/components/reusable/footer';
import Header from '@/components/reusable/header';
import { useCartStore } from '@/store/cart';
import React, { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { totalItems } = useCartStore();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header toggleCart={toggleCart} cartItemsCount={0} />
        {children}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleCart={toggleCart} cartItemsCount={totalItems} />
      {children}
      <Cart
        isOpen={isCartOpen}
        toggleCart={toggleCart}
      />
      <Footer />
    </div>
  );
}
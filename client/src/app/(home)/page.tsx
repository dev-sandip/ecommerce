"use client"
import CTASection from "@/components/reusable/cta"
import DynamicBanner from "@/components/reusable/dyanmic-banner"
import Footer from "@/components/reusable/footer"
import Header from "@/components/reusable/header"
import { useState } from "react"


const LandingPage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cart, setCart] = useState([])

    const toggleCart = () => setIsCartOpen(!isCartOpen)
    return (
        <div className="min-h-screen flex flex-col">
            <Header toggleCart={toggleCart} cartItemsCount={cart.length} />
            <main className="flex-grow">
                <DynamicBanner />
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Our Store</h1>
                    {/* <ProductList addToCart={addToCart} /> */}
                </div>
                <CTASection />
            </main>
            {/* <Cart
                isOpen={isCartOpen}
                toggleCart={toggleCart}
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
            /> */}
            <Footer />
        </div>
    )
}

export default LandingPage
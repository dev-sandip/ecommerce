"use client"
import CTASection from "@/components/reusable/cta"
import DynamicBanner from "@/components/reusable/dyanmic-banner"
import ProductList from "@/components/reusable/product-list"


const LandingPage = () => {

    return (
        <div>

            <main className="flex-grow">
                <DynamicBanner />
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Our Store</h1>
                    {/* <ProductList addToCart={addToCart} /> */}
                    <ProductList />
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

        </div>
    )
}

export default LandingPage
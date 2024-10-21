'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const banners = [
    {
        id: 1,
        title: 'Summer Sale',
        description: 'Get up to 50% off on selected items',
        image: '/placeholder.svg?height=600&width=1600',
        cta: 'Shop Now',
    },
    {
        id: 2,
        title: 'New Arrivals',
        description: 'Check out our latest collection',
        image: '/placeholder.svg?height=600&width=1600',
        cta: 'Explore',
    },
    {
        id: 3,
        title: 'Free Shipping',
        description: 'On orders over $100',
        image: '/placeholder.svg?height=600&width=1600',
        cta: 'Learn More',
    },
]

export default function DynamicBanner() {
    const [currentBanner, setCurrentBanner] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length)
    }

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
    }

    return (
        <div className="relative h-[600px] overflow-hidden">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        backgroundImage: `url(${banner.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
                            <p className="text-xl md:text-2xl mb-8">{banner.description}</p>
                            <Button size="lg" variant="secondary">
                                {banner.cta}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
                onClick={prevBanner}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
                onClick={nextBanner}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    )
}
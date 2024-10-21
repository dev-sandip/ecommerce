import { Button } from '@/components/ui/button'

export default function CTASection() {
    return (
        <section className="bg-primary text-primary-foreground py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
                <p className="text-xl mb-8">Stay updated with our latest offers and products</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:w-64 px-4 py-2 rounded-md text-gray-900"
                    />
                    <Button size="lg" variant="secondary">
                        Subscribe
                    </Button>
                </div>
            </div>
        </section>
    )
}
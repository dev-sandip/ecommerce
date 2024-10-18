import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-600">We are dedicated to providing the best products and shopping experience for our customers.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Products</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Categories</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-600">123 Store Street, City, Country</p>
                        <p className="text-gray-600">Email: info@store.com</p>
                        <p className="text-gray-600">Phone: (123) 456-7890</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <Instagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">&copy; 2023 Our Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
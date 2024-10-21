import type { Metadata } from 'next'
import React from 'react'
import Sidebar from '../_components/sidebar'

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'E-commerce Admin Dashboard',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="ml-60 flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    )
}

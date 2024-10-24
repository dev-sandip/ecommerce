"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const pathname = usePathname()
    return (
        <main className='bg-neutral-100 min-h-screen flex flex-col'>
            <div className='mx-auto max-w-screen-2xl p-4 w-full'>
                <nav className='flex justify-between items-center'>
                    <Link href='/'>
                        <Image src="/logo.svg" alt="logo" width={152} height={56} />
                    </Link>
                    <Button variant="secondary">
                        <Link href={pathname === '/login' ? '/register' : '/login'}>
                            {pathname === '/login' ? 'Sign Up' : 'Login'}
                        </Link>
                    </Button>
                </nav>
            </div>
            <div className='flex-grow flex items-center justify-center'>
                <div className='w-full max-w-md'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default AuthLayout
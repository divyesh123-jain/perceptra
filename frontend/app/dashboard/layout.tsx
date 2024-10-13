'use client';
import Navbar from '@/components/Navbar/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react'
import React, { FC, ReactNode } from 'react'
import { GeistSans } from "geist/font/sans";

interface props {
    children: ReactNode
}

const Layout: FC<props> = (props) => {
    return (
        <html lang='en' className={GeistSans.className}>
            <head>
                <title>Dashboard</title>
            </head>
            <body>
                <SessionProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className='w-full h-screen flex bg-secondary dark:bg-secondary/20 text-primary'>
                            <Navbar />
                            <div className='p-6 w-full px-8'>
                                {props.children}
                            </div>
                        </div>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

export default Layout
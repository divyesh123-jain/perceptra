'use client';
import { Button } from '@/components/ui/button'
import { SessionProvider, signOut} from 'next-auth/react'
import React, { FC, ReactNode } from 'react'

interface props {
    children: ReactNode
}

const Layout: FC<props> = (props) => {
    return (
        <SessionProvider>
        <div className='w-full h-screen '>
            <Button onClick={()=>signOut({callbackUrl:"/auth"})}>Log Out</Button>
            {props.children}
        </div>
        </SessionProvider>
    )
}

export default Layout
'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

import { VscFeedback } from 'react-icons/vsc';
import { Button } from '../ui/button';
import { TbLogout2 } from 'react-icons/tb';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CiSettings } from 'react-icons/ci';
import { ModeToggle } from '../ModeToggle';


const Navbar = () => {
    const { data: session } = useSession()
    return (
        <div className='w-[85px] bg-primary-foreground text-primary text-3xl flex py-6 flex-col items-center'>
            <Link href="/dashboard"><VscFeedback /></Link>

            <div className='mt-auto'>
            <Popover>
                <PopoverTrigger>
                    <img src={session?.user?.image || ""} alt="avatar" className='h-[45px] w-[45px] rounded-full hover:border-2 hover:border-secondary/30 smooth duration-0' />
                </PopoverTrigger>
                <PopoverContent className='flex w-auto ml-2 bg-black border-none flex-center gap-3 p-4'>
                    <Button className='text-2xl'><CiSettings /></Button>
                    <Button onClick={()=>signOut({callbackUrl:"/auth"})} className='text-2xl'><TbLogout2 /></Button>
                </PopoverContent>
            </Popover>
            </div>
            <ModeToggle />
        </div>
    )
}

export default Navbar
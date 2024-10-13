'use client';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import CreateProject from '@/components/Sheets/CreateProject';


const Page = () => {
  useEffect(()=>{},[])
  const { data: session, status } = useSession()
  const router = useRouter()
  if (status === "unauthenticated") {
    router.push('/auth')
  }
  return (
    <div className='w-full  h-full'>
      <h4 className='text-xl font-light'><span className='font-semibold '>Perceptra</span> / <span className='text-primary/70 '>{session?.user?.name}</span></h4>
      <div className='mt-10 '>
        <div className='flex items-center justify-between'>
          <h3>Projects</h3>
          <CreateProject />

        </div>
        <Separator className='bg-primary/10 my-2' />
        Hello
      </div>
    </div>
  )
}

export default Page
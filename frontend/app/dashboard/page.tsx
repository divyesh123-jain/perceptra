'use client';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const  Page = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  if(status === "unauthenticated"){
    router.push('/auth')
  }
  return (
    <div>dashboard</div>
  )
}

export default Page
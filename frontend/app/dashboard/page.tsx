'use client';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import CreateProject from '@/components/Sheets/CreateProject';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { eventNames } from 'process';
import Link from 'next/link';

const obj = {
  "owner": "akashsharma2002@gmail.com",
  "event_type": "conference",
  "event_name": "JSConf",
  "event_desc": "A fun place ",
  "$id": "670ba47f9d679ca7924d",
  "$createdAt": "2024-10-13T10:44:15.645+00:00",
  "$updatedAt": "2024-10-13T10:44:15.645+00:00",
  "$permissions": [],
  "forms": [],
  "$databaseId": "perceptra_db",
  "$collectionId": "670b4ac7000184b821c4"
}


const Page = () => {
  const [data, setData] = useState([])

  const getData = async () => {
    const req = await fetch("/api/event")
    const r = await req.json()
    console.log(r.documents)
    setData(r?.documents || [])
  }


  useEffect(() => {
    getData()
  }, [])
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
          <h3>Your Events</h3>
          <CreateProject />

        </div>
        <Separator className='bg-primary/10 my-2' />
        <div className='grid grid-cols-6 gap-4 my-4'>
          {data?.map((d) => <GlassmorphismCard key = {d["$id"]} event_name={d["event_name"]} date = {d["$createdAt"]} desc= {d["event_desc"]} id = {d["$id"]} />)}
        </div>
        {/* {data} */}
      </div>
    </div>
  )
}


interface eventCardProps {
  event_name : string
  id : string,
  date: string,
  desc: string
}
const GlassmorphismCard : FC<eventCardProps>= ({event_name, id, date, desc}) => {
  return (
    <Link href = {`dashboard/project/${id}`} className='relative overflow-hidden'>
      <div className='absolute text-[8rem] font-extrabold text-secondary z-[-1]'>{event_name}</div>
      <div className='flex flex-col bg-secondary/70 p-6 rounded-md items-start gap-2  w-full'>
        <h4 className='font-medium'>{event_name}</h4>
        <Badge>{(new Date(date).toDateString())}</Badge>
        <p className='text-primary/80 font-medium'>{desc}</p>
      </div>
    </Link>
  );
};



export default Page
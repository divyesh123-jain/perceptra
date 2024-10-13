"use client";
import FormList from '@/components/Form/FormList';
import CreateFrom from '@/components/Sheets/CreateForm';
import { Separator } from '@/components/ui/separator'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Project = () => {
    const [data,setData] = useState()
    const {id} = useParams()
    const getData = async() => {
        if(id){
            const r = await ( await fetch("/api/eventid/"+ id)).json()
            console.log(r)
            setData(r)
        }
    }
    useEffect(()=>{
        getData()
    },[])

    const { data: session } = useSession()
    return (
        <div className='w-full  h-full'>
            <h4 className='text-xl font-light'><span className='font-semibold '>Perceptra</span> / <span className='text-primary/70 '>{session?.user?.name}</span> / {data && data["event_name"]}</h4>
            <div className='mt-10 '>
                <div className='flex items-center justify-between'>
                    <h3>{data && data["event_name"]}</h3>
                    <CreateFrom id={id as string} />
                </div>
                <Separator className='bg-primary/10 my-2' />
                <div>
                    <FormList id = {id as string}/>
                </div>
            </div>
        </div>
    )
}

export default Project
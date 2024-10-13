import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { Badge } from '../ui/badge'

const FormList = ({ id }: { id: string }) => {
    const [data, setData] = useState([])
    const getData = async () => {
        const res= await(await fetch(`/api/form/list/${id}`)).json()
        console.log(res)
        setData(res.documents)
    }

    useEffect(()=>{
        getData()
    },[])
    return (
        <div className='grid grid-cols-6 gap-4'>
            {data?.map((d)=><Card desc = {d["form_desc"]} name = {d["form_name"]} id = {d["$id"]} date = {d["$createdAt"]} key = {d["$id"]} />)}
        </div>
    )
}

interface cardprops {
    name: string,
    id: string,
    date: string
    desc: string
}

const Card : FC<cardprops>= ({name, id, date, desc} ) => {
    return (
        <Link href={`/dashboard/form/${id}`} className='p-4 bg-secondary rounded-md'>
            <p className='font-medium text-2xl'>{name}</p>
            <p className='my-2 text-primary/70'>{desc}</p>
            <Badge>{(new Date(date)).toDateString()}</Badge>
        </Link>
    )
}

export default FormList
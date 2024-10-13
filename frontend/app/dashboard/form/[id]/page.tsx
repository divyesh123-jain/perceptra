"use client";
import FormBuilder from '@/components/Form/FormBuilder';
import { Separator } from '@/components/ui/separator'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React from 'react'

const FormBuilderContainer = () => {
    const {id} = useParams()
    const { data: session } = useSession()
    return (
        <div className='w-full  h-full'>
            <h4 className='text-xl font-light'><span className='font-semibold '>Perceptra</span> / <span className='text-primary/70 '>{session?.user?.name}</span> / Forms / {id}</h4>
            <div className='mt-10 '>
                <div className='flex items-center justify-between'>
                    <h3>Form Builder</h3>
                    {/* <CreateFrom /> */}
                </div>
                <Separator className='bg-primary/10 my-2' />
                <FormBuilder />
            </div>  
        </div>
    )
}

export default FormBuilderContainer
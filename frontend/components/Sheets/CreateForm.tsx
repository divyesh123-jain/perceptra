"use client";
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useSession } from 'next-auth/react';



export type FormType = {
    form_name: string
    form_desc: string
}

const CreateFrom = ({id}:{id : string}) => {
    const { register, handleSubmit } = useForm<FormType>()
    const {data:session} = useSession()
    const onSubmit: SubmitHandler<FormType> = async (data) => {
        const payload = {
            ...data,
            owner: session?.user?.email as string,
            event_id: id,
        }
        const result = await fetch("/api/form", {
            method:"POST",
            body:JSON.stringify(payload)
        })
        console.log(await result.json())
    }
    return (
        <Sheet>
            <SheetTrigger>
                <Button className='h-full font-medium text-xl' variant={"default"}>New Form + </Button></SheetTrigger>
            <SheetContent className='backdrop-blur-xl'>
                <SheetHeader>
                    <SheetTitle>Create a new form</SheetTitle>
                    <SheetDescription>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-5">
                            <Label className='text-primary' htmlFor="name">Form Heading</Label>
                            <Input type="text" {...register("form_name")} id="name" />


                            <Label className='text-primary' htmlFor="form_desc">Form Description</Label>
                            <Textarea  {...register("form_desc")} id="form_desc" />
                            <Button type="submit">Create</Button>
                        </form>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default CreateFrom
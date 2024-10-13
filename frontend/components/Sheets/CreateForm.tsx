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



export type FormType = {
    name: string
    desc: string
}

const CreateFrom = () => {
    const { register, handleSubmit } = useForm<FormType>()
    const onSubmit: SubmitHandler<FormType> = (data) => {
        console.log(data)
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
                            <Input type="text" {...register("name")} id="name" />


                            <Label className='text-primary' htmlFor="desc">Form Description</Label>
                            <Textarea  {...register("desc")} id="desc" />
                            <Button type="submit">Create</Button>
                        </form>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default CreateFrom
import React from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


enum eventType {
    conf = "conference",
    meetup = "meetup"
}


export type projectForm = {
    name: string
    type: eventType
    desc: string
}

const CreateProject = () => {
    const { register, handleSubmit, control } = useForm<projectForm>()
    const onSubmit: SubmitHandler<projectForm> = (data) => {
        console.log(data)
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button className='h-full font-medium text-xl' variant={"default"}>Create New</Button></SheetTrigger>
            <SheetContent className='backdrop-blur-xl'>
                <SheetHeader>
                    <SheetTitle>Create a new project</SheetTitle>
                    <SheetDescription>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-5">
                            <Label className='text-primary' htmlFor="name">Project Name</Label>
                            <Input type="text" {...register("name")} id="name" />

                            <Label className='text-primary' htmlFor='type'>Project Type</Label>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(eventType).map((type) => {
                                                const eventKey = type as keyof typeof eventType;
                                                return (
                                                    <SelectItem key={eventKey} value={eventType[eventKey]}>
                                                        {eventType[eventKey]}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            <Label className='text-primary' htmlFor="desc">Project Description</Label>
                            <Textarea  {...register("desc")} id="desc" />
                            <Button type="submit">Create</Button>
                        </form>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default CreateProject
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '../ui/button'

const CreateProject = () => {
  return (
    <Sheet>
    <SheetTrigger>
    <Button className='h-full font-medium text-xl' variant={"default"}>Create New</Button></SheetTrigger>
    <SheetContent className='backdrop-blur-xl'>
      <SheetHeader>
        <SheetTitle>Create a new project</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  )
}

export default CreateProject
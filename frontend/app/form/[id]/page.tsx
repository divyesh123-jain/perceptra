import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

interface FormPageProps {
  params: {
    id: string
  }
}

async function fetchData(id: string) {
  const res = await fetch(`http://localhost:3000/api/form/${id}`, {
    cache: 'no-store', // Prevent caching if you want fresh data
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  console.log(res)
  return res.json()
}



const Form  = async ({params}:FormPageProps) => {
  const obj = await fetchData(params.id)
  const format = JSON.parse(obj.form_format)
  return (
    <>
      <div className='flex flex-col items-center'>
        <h3 className='font-semibold'>{format.name}</h3>
        <p className='text-lg text-secondary/70 font-normal'>
          {format.description}
        </p>
      </div>
      <form className='flex flex-col gap-3 max-w-[800px] w-full'>
        {format.format.map((field :any) => {
          if (field.type === "textarea") {
            return (
              <div key={field.id} className='flex flex-col gap-3'>
                <Label className='text-md font-semibold'>{field.label}</Label>
                <Textarea className='w-full border-secondary/20 rounded-sm h-[250px] focus:bg-secondary/10' />
              </div>
            )
          } else {
            return (
              <div key={field.id} className='flex flex-col gap-3'>
                <Label className='text-md font-semibold'>{field.label}</Label>
                <Input type={field.type} className='w-full border-secondary/20 text-lg h-[40px] focus:bg-secondary/10 rounded-sn ' />
              </div>
            )
          }
        })}
       <div className="grid grid-cols-2 gap-3">
          <Button type = "submit" variant={"secondary"}>Submit</Button>
          <Button type = "reset">Reset</Button>
       </div>
      </form>
    </>
  )
}

export default Form
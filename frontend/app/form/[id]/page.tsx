import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Form = () => {
  const obj = {
    name: "JSConf Feedback",
    description: "Your feedbacks will help us in organising a better JSConf next time.",
    format: [
      {
        "id": "4obirrb",
        "label": "Name",
        "type": "text",
        "required": true
      },
      {
        "id": "wsknj1l",
        "label": "Rating out of 10",
        "type": "number",
        "required": true
      },
      {
        "id": "wsknj12",
        "label": "Feedback",
        "type": "textarea",
        "required": true
      }
    ]
  }
  return (
    <>
      <div className='flex flex-col items-center'>
        <h3 className='font-semibold'>{obj.name}</h3>
        <p className='text-lg text-secondary/70 font-normal'>
          {obj.description}
        </p>
      </div>
      <form className='flex flex-col gap-3 max-w-[800px] w-full'>
        {obj.format.map((field) => {
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
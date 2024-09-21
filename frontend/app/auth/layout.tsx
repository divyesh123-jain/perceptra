import React, { FC, ReactNode } from 'react'

interface props {
  children: ReactNode
}

const layout: FC<props> = (props) => {
  return (
    <div className='w-full h-screen '>
      {props.children}
    </div>
  )
}

export default layout
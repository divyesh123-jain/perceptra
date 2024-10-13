import { GeistSans } from 'geist/font/sans'
import React, { FC, ReactNode } from 'react'

interface props {
  children :ReactNode
}

const Layout: FC<props> = ({children}) => {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='flex flex-col items-center min-h-[99vh] justify-center  gap-6'>
        {children}
      </body>
    </html>  
  )
}

export default Layout
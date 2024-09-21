'use client';
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";


export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full ">
      <div className="flex flex-col items-center gap-4 justify-center relative">
        <h2>Sign In to your Account</h2>
        <p className="text-md text-secondary/70 font-medium">Sign in either with google or github to continue </p>
        <div className="flex gap-6">
          <div className='oauthbox'>
            <FaGoogle className="text-2xl" />
            <p className='mt-4'>Sign In</p>
            <h5 className='font-[600]'>with Google</h5>
          </div>
          <div onClick={()=>signIn('github',{
            callbackUrl:"/dashboard"
          })} className='oauthbox'>
            <FaGithub className="text-2xl" />
            <p className='mt-4'>Sign In</p>
            <h5 className='font-[600]'>with Github</h5>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-center h-full  overflow-hidden ">
        <img src="https://cdn.dribbble.com/userupload/14212710/file/original-66dea0af4668c1b24237b52507c2a399.png?resize=1504x1128&vertical=center" className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  )
}
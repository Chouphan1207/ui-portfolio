'use client'

import React from 'react'
import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function SignUpPrompt() {
  const username = useSelector((state: RootState) => state.user.username)
  console.log(username)

  return (
    !username &&
    <div className='fixed w-full h-[80px] bg-[var(--muted-foreground)] bottom-0 flex justify-center items-center space-x-5 lg:justify-between lg:px-20 xl:px-40 2xl:px-80'>
        <div className='hidden md:flex flex-col text-[var(--background)]'>
            <span className='text-xl font-bold'>
                Don&apos;t miss out on the latest updates!
            </span>
            <span>
                Join the community and start sharing your own ideas today.
            </span>
        </div>
        <div className='flex space-x-4 w-full md:w-fit p-3'>
        <SignInModal/>
        <SignUpModal/>
        </div>
    </div>
  )
}

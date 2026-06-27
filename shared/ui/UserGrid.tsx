'use client'

import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUser } from '@/shared/state/userSlice'
import SignInModal from '@/components/blog/SignInModal'
import { AppDispatch, RootState } from '@/shared/state'
import { closeSignInModal, closeSignUpModal } from '@/shared/state/uiSlice'
import { useRouter } from 'next/navigation'

const UserGrid = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    dispatch(signOutUser())
    dispatch(closeSignUpModal())
    dispatch(closeSignInModal())
    router.refresh()
  }

  useEffect(() => {
    if (user.username) {
      router.refresh()
    }
  }, [user.username])

  if (!user.username) {
    return (
      <div className="bg-background/20 rounded-full w-20 h-12 md:w-20 md:h-10">
        <SignInModal />
      </div>
    )
  }

  return (
    <div
      className="group relative flex items-center rounded-full bg-[--input] hover:bg-[--card] hover:bg-opacity-50 p-2 pe-4 transition-colors duration-300 cursor-pointer overflow-hidden w-fit"
      onClick={handleSignOut}
    >
      <Image
        src="/user.png"
        width={36}
        height={36}
        alt="Profile Picture"
        className="w-9 h-9 rounded-full transition-transform duration-300 flex flex-col group-hover:scale-105"
      />
      <div
        className="
          flex
          flex-col
          ml-0
          max-w-10
          opacity-0
          translate-x-2.5
          overflow-hidden
          whitespace-nowrap
          transition-all
          duration-500
          ease-in-out
          group-hover:max-w-40
          group-hover:opacity-100
          group-hover:translate-x-0
          group-hover:ml-3

          md:max-w-40
          md:opacity-100
          md:translate-x-0
          md:ml-3
          text-sm
        "
      >
        <span className="font-bold text-ellipsis overflow-hidden">{user.name || 'Guest'}</span>
        <span className="text-neutral-500 text-ellipsis overflow-hidden">@{user.username || 'guest0000'}</span>
      </div>
    </div>
  )
}

export default UserGrid

'use client'

import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/shared/state'
import { openSignUpModal, closeSignUpModal } from '@/shared/state/uiSlice'
import { FaEyeSlash, FaXmark } from 'react-icons/fa6'
import { FaEye } from 'react-icons/fa'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'
import { signInUser } from '@/shared/state/userSlice'


export default function SignUpModal() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const isOpen = useSelector((state: RootState) => state.modals.signUpModalOpen);
    const dispatch: AppDispatch = useDispatch()

    async function handleSignUp() {
      const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
      );
      await updateProfile(userCredentials.user, {
          displayName: name
        });
        dispatch(signInUser(
          {
                name: userCredentials.user.displayName ?? 'Guest',
                username: (userCredentials.user.email ?? 'guest').split('@')[0],
                email: userCredentials.user.email ?? 'guest@gmail.com',
                uid: userCredentials.user.uid,
          }))
      }

        async function handleGuestLogIn() {
          await signInWithEmailAndPassword(auth, 'Guest@gmail.com', '12345678')
        }

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return

            // Handle Redux Action
            dispatch(signInUser(
              {
              name: currentUser.displayName ?? 'Guest',
              username: currentUser.email?.split('@')[0] ?? 'Guest0000',
              email: currentUser.email ?? 'guest@gmail.com',
              uid: currentUser.uid,
              }
          ))
            console.log('User is signed in:', currentUser);
          }
        );
        return unsubscribe
      }, [])
    return (
    <>
    <button
    className="w-full h-12 md:w-20 md:h-10 bg-[--background]/90 text-[--foreground] rounded-3xl font-bold transition-transform duration-300 ease-in-out hover:bg-opacity-80 hover:scale-105 outline-none"
    onClick={() => dispatch(openSignUpModal())}
    >
        Sign Up
    </button>
    <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='flex items-center justify-center'
    >
        <div className='mt-40 sm:mt-0 w-full h-full sm:w-150 sm:h-fit bg-[--background] shadow-xl sm:rounded-xl'>
            <FaXmark className='w-7 mt-5 ms-5 sm:px-20'
            onClick={() => dispatch(closeSignUpModal())}/>
            <div className='pt-10 pb-20 px-4 sm:px-20'>
            <h1 className='text-3xl font-bold mb-10'>Create your account</h1>
            <div className='w-full space-y-5 mb-10'>
                <input
                type="text"
                className='w-full h-13.5 border border-gray-200 outline-none pl-3 rounded-sm  transition focus:border-[--foreground]'
                placeholder='Name'
                onChange={(event) => setName(event.target.value)}
                value={name}
                />
                <input
                type="text"
                className='w-full h-13.5 border border-gray-200 outline-none pl-3 rounded-sm  transition focus:border-[--foreground]'
                placeholder='Email'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                />
                <div className='w-full h-13.5 border border-gray-200 outline-none rounded-sm  transition focus-within:border-[--foreground] flex items-center overflow-hidden pr-3'>
                    <input
                    className='w-full h-full ps-3 outline-none'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    />
                    <div
                    onClick={() => setShowPassword(!showPassword)}
                    className='w-5 h-5 tdext-gray-400 cursor-pointer'>
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </div>
                </div>
            </div>
            <button
                className='bg-[--foreground] text-[--background] w-full h-12 rounded-full font-bold hover:bg-opacity-25 transition'
                onClick={() => handleSignUp()}>
                Sign Up
            </button>
            <span className='my-3 text-sm text-center block'>Or</span>
            <button
                className='bg-[--foreground] text-[--background] w-full h-12 rounded-full font-bold hover:bg-opacity-25 transition' onClick={handleGuestLogIn}>
                Log In as Guest
            </button>
            </div>
        </div>
    </Modal>
    </>
  )
}

'use client'

import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { openSignInModal, closeSignInModal } from '@/redux/slices/modalSlice'
import { signInUser } from '@/redux/slices/userSlice'
import { FaEyeSlash, FaXmark } from 'react-icons/fa6'
import { FaEye } from 'react-icons/fa'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'next/navigation'

export default function SignInModal() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isOpen = useSelector((state: RootState) => state.modals.signInModalOpen)
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()

  async function handleLogin(emailInput: string, passwordInput: string) {
    try {
      const res = await signInWithEmailAndPassword(auth, emailInput, passwordInput)
      const user = res.user

      dispatch(
        signInUser({
          name: user.displayName || 'User',
          username: user.email?.split('@')[0] || 'user0000',
          email: user.email,
          uid: user.uid,
        })
      )

      dispatch(closeSignInModal())
      router.refresh()
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <>
      <button
        className="w-full h-[48px] md:w-[80px] md:h-[40px] bg-[var(--background)]/90 text-[var(--foreground)] rounded-3xl font-bold transition-transform duration-300 ease-in-out hover:bg-opacity-80 hover:scale-105 outline-none"
        onClick={() => dispatch(openSignInModal())}
      >
        Login
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignInModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="mt-0 sm:mt-20 w-full h-full sm:w-[600px] sm:h-fit bg-[var(--background)] shadow-xl sm:rounded-xl">
          <FaXmark className="w-7 mt-5 ms-5 sm:px-20 cursor-pointer" onClick={() => dispatch(closeSignInModal())} />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Login to your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                type="email"
                className="w-full h-[54px] border border-gray-200 outline-none pl-3 rounded-[4px] transition focus:border-[var(--foreground)]"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className="w-full h-[54px] border border-gray-200 outline-none rounded-[4px] transition focus-within:border-[var(--foreground)] flex items-center overflow-hidden pr-3">
                <input
                  className="w-full h-full ps-3 outline-none"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div onClick={() => setShowPassword(!showPassword)} className="w-5 h-5 text-gray-400 cursor-pointer">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button
              className="bg-[var(--foreground)] text-[var(--background)] w-full h-[48px] rounded-full font-bold transition-all duration-300 ease-in-out transform hover:bg-opacity-25 hover:scale-105 hover:shadow-lg"
              onClick={() => handleLogin(email, password)}
            >
              Login
            </button>
            <span className="my-3 text-sm text-center block">Or</span>
            <button
              className="bg-[var(--foreground)] text-[var(--background)] w-full h-[48px] rounded-full font-bold transition-all duration-300 ease-in-out transform hover:bg-opacity-25 hover:scale-105 hover:shadow-lg"
              onClick={() => handleLogin('Guest@gmail.com', '12345678')}
            >
              Log In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

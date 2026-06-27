'use client'

import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/shared/state'
import { openSignInModal, closeSignInModal } from '@/shared/state/uiSlice'
import { signInUser } from '@/shared/state/userSlice'
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
          name: user.displayName ?? 'Guest',
          username: user.email?.split('@')[0] ?? 'Guest0000',
          email: user.email ?? 'guest@gmail.com',
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
        className="w-full h-12 md:w-20 md:h-10 text-primary-foreground rounded-3xl font-bold transition-transform duration-700 ease-in-out hover:text-secondary hover:scale-105 outline-none"
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
        {/* ✨ FIX: Changed sm:w-150 to max-w-md or max-w-lg for universal layout spacing constraints */}
        <div className="relative mt-0 sm:mt-20 w-full h-full sm:w-full sm:max-w-lg sm:h-auto bg-background shadow-xl sm:rounded-xl overflow-y-auto">

          {/* ✨ FIX: Cleared sm:px-20 from the SVG element. Positioned it neatly in the top corner instead */}
          <button
            onClick={() => dispatch(closeSignInModal())}
            className="absolute top-5 left-5 text-neutral-500 hover:text-[--foreground] transition-colors outline-none"
            aria-label="Close modal"
          >
            <FaXmark className="w-6 h-6" />
          </button>

          <div className="pt-16 pb-12 px-6 sm:px-16">
            <h1 className="text-3xl font-bold mb-8 text-[--foreground]">Login to your account</h1>

            <div className="w-full space-y-4 mb-8">
              {/* ✨ FIX: Changed h-13.5 to standard h-12 for clean cross-browser input field scaling */}
              <input
                type="email"
                className="w-full h-12 border border-gray-200 outline-none pl-3 rounded-md transition focus:border-[--foreground] bg-transparent text-[--foreground]"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <div className="w-full h-12 border border-gray-200 outline-none rounded-md transition focus-within:border-[--foreground] flex items-center overflow-hidden pr-3 bg-transparent">
                <input
                  className="w-full h-full ps-3 outline-none bg-transparent text-[--foreground]"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[--foreground] transition-colors outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="bg-foreground text-background w-full h-12 rounded-full font-bold transition-all duration-300 ease-in-out transform hover:bg-opacity-90 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => handleLogin(email, password)}
              >
                Login
              </button>

              <div className="flex items-center justify-center my-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Or</span>
              </div>

              <button
                className="border border-gray-200 text-[--foreground] w-full h-12 rounded-full font-bold transition-all duration-300 ease-in-out transform hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-[1.02]"
                onClick={() => handleLogin('Guest@gmail.com', '12345678')}
              >
                Log In as Guest
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

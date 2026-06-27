import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import modalSlice from './uiSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice
  },
  // Ensure middleware is configured standardly for runtime stability
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// Infer core types from the store runtime
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Pre-typed custom hooks for elegant, type-safe state access across your UI
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)

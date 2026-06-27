// File Path: redux/slices/modalSlice.ts (or features/modal/model/slice.ts)
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CommentPostDetails {
  name: string
  username: string
  id: string
  text: string
}

interface ModalState {
  signUpModalOpen: boolean
  signInModalOpen: boolean
  commentModalOpen: boolean
  commentPostDetails: CommentPostDetails
}

const initialState: ModalState = {
  signUpModalOpen: false,
  signInModalOpen: false,
  commentModalOpen: false,
  commentPostDetails: {
    name: "",
    username: "",
    id: "",
    text: "",
  }
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false
    },
    openSignInModal: (state) => {
      state.signInModalOpen = true
    },
    closeSignInModal: (state) => {
      state.signInModalOpen = false
    },
    openCommentModal: (state) => {
      state.commentModalOpen = true
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false
    },
    setCommentDetails: (state, action: PayloadAction<CommentPostDetails>) => {
      // Direct assignment thanks to Immer integration in RTK
      state.commentPostDetails = action.payload
    }
  },
});

export const {
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
  openCommentModal,
  closeCommentModal,
  setCommentDetails,
} = modalSlice.actions

export default modalSlice.reducer;

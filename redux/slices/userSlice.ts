import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  username: string
  email: string | null
  uid: string
}

const initialState: UserState = {
  name: "",
  username: "",
  email: "",
  uid: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action: PayloadAction<UserState>) => {
      return action.payload
    },
    signOutUser: () => {
      return initialState
    }
  }
});

export const { signInUser, signOutUser } = userSlice.actions

export default userSlice.reducer;

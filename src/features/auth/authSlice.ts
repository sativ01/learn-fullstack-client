import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string | null
  isLoggedIn: boolean
  firstName?: string
  lastName?: string
  email?: string
}

interface CurrentUser {
  user: User
}

const initialState: CurrentUser = {
  user: {
    id: null,
    isLoggedIn: false
  }
}

const oauthSlice = createSlice({
  name: 'oauth',
  initialState,
  reducers: {
    setUser (state, action: PayloadAction<User>) {
      state.user = action.payload
    }
  }
})

export const { setUser } = oauthSlice.actions

export default oauthSlice.reducer

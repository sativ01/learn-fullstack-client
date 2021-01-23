import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrentUser, logoutCurrentUser } from '../../api/ownApi'
import { AppThunk } from '../../store'
export interface User {
  id: string | null
  name?: string
  email?: string
}

export interface RawUser {
  _id: string | null
  name?: string
  email?: string
}

interface CurrentUser {
  loading: boolean
  error: string | null
  user: User
}

const initialState: CurrentUser = {
  loading: false,
  error: null,
  user: {
    id: null
  }
}

function startFetchingUser (state: CurrentUser) {
  state.loading = true
}

function finishFetching (state: CurrentUser) {
  state.loading = false
}

function errorWhileFetching (
  state: CurrentUser,
  { payload }: PayloadAction<string>
) {
  state.loading = false
  state.error = payload
}

const oauthSlice = createSlice({
  name: 'oauth',
  initialState,
  reducers: {
    getUserStart: startFetchingUser,
    getUserEnd: finishFetching,
    getUserFail: errorWhileFetching,
    setLoggedInUser (state, action: PayloadAction<RawUser>) {
      const { name, email, _id } = action.payload
      state.user = {
        id: _id,
        name,
        email
      }
      state.loading = false
      state.error = null
    },
    setUnknownUser (state) {
      state.user = { ...initialState.user }
      state.loading = false
      state.error = null
    }
  }
})

export const {
  getUserStart,
  getUserEnd,
  setLoggedInUser,
  setUnknownUser,
  getUserFail
} = oauthSlice.actions
export default oauthSlice.reducer

export const fetchUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserStart())
    const user = await getCurrentUser()

    if (user === '') {
      dispatch(setUnknownUser())
    } else {
      dispatch(setLoggedInUser(user))
    }
  } catch (err) {
    dispatch(getUserFail(err.toString()))
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserStart())
    await logoutCurrentUser()
    dispatch(setUnknownUser())
  } catch (err) {
    dispatch(getUserFail(err.toString()))
  }
}

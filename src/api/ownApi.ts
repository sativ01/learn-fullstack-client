import axios from 'axios'
import { RawUser } from '../features/auth/authSlice'

const urls = {
  getUser: '/api/current_user',
  logout: '/api/logout'
}

export async function getCurrentUser (): Promise<RawUser | ''> {
  const { data } = await axios.get<RawUser>(urls.getUser)
  return data
}

export async function logoutCurrentUser (): Promise<null> {
  await axios.get<null>(urls.logout)

  return null
}

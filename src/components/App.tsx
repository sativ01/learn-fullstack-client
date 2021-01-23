import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import '@fontsource/roboto'
import { BrowserRouter } from 'react-router-dom'
import SignUp from '../features/auth/SignUp'
import HeadBar from './HeadBar'
import { RootState } from '../rootReducer'
import { fetchUser } from '../features/auth/authSlice'

function App () {
  const { user, loading } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <HeadBar user={user} loading={loading} />
          <div>{!user.id && !loading && <SignUp />}</div>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App

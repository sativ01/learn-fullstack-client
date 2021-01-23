import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { logout, User } from '../features/auth/authSlice'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)

interface Props {
  user: User | null
  loading: boolean
}

function LoginOrName ({ user, loading }: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [loggingOut, setLoggingOut] = useState<boolean>(false)

  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!loggingOut && user?.id) {
      dispatch(logout())
      setLoggingOut(true)
    }
  }

  useEffect(() => {
    if (loggingOut && !loading) {
      setLoggingOut(false)
      history.push('/')
    }
  }, [loading, loggingOut])

  if (loading) return <CircularProgress />
  if (!user?.id) {
    return (
      <Button color="inherit" href="/auth/google">
        Login
      </Button>
    )
  } else {
    return (
      <>
        <Typography
          variant="h6"
          className={classes.title}
        >{`Hi, ${user.name}`}</Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </>
    )
  }
}

export default function HeadBar ({ user, loading }: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <LoginOrName user={user} loading={loading} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

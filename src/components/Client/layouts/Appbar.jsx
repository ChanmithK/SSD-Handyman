import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function MenuAppBar() {
  const title = useSelector((state) => state.setTitle.title)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        bgcolor: '#2A3036',
        height: '64px',
        boxShadow: '0 8px 6px -7px #999',
        filter:
          'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.18)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.12))',
      }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{
            display: {
              fontFamily: 'Roboto',
              fontWweight: 700,
              fontSize: '20px',
              lineHeight: '160%',
            },
          }}
        >
          FIT FLAME
        </Typography>
        <Divider
          orientation='vertical'
          variant='middle'
          flexItem
          sx={{
            borderRightWidth: 2,
            filter: `blur(0.4px)`,
            marginLeft: 4,
            marginRight: 4,
            bgcolor: 'white',
          }}
        />
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
              fontFamily: ['Roboto', 'sans-serif'].join(','),
              fontWeight: 300,
              fontSize: '21px',
              lineHeight: '160%',
            },
          }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <div>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={() => {
              navigate('/client-profile')
            }}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

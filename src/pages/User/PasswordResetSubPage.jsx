import React from 'react'
import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import { useUserAuth } from '../../Context/UserAuthContext'
import { useNavigate } from 'react-router-dom'

function PasswordResetSubPage() {
  const [email, setEmail] = useState('')
  const { resetPassword } = useUserAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await resetPassword(email)
      navigate('/signIn')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Password Reset
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <Button
            onClick={handleSubmit}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/signIn' variant='body2'>
                Remember your password? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default PasswordResetSubPage

import React from 'react'
import { Box, Grid } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { collection, getDoc, query, where, doc } from '@firebase/firestore'
import { db, getDB } from '../../firebase-config'
import { getAuth } from '@firebase/auth'
import { useNavigate } from 'react-router-dom'

function ClientProfileSubPage() {
  // const auth = getAuth()
  // const [profile, setprofile] = useState([])
  // const user = window.localStorage.getItem('user')
  // const userID = JSON.parse(user).user
  // console.log('rasanga', userID)

  // const fetchTasks = useCallback(async () => {
  //   if (userID) {
  //     const db = getDB()
  //     const q = query(collection(db, 'users'), where('user', '==', userID))

  //     try {
  //       const results = await getDocs(q)
  //       let resultTasks = []
  //       results.forEach((doc) => {
  //         resultTasks.push({
  //           ...doc.data(),
  //           uid: doc.id,
  //         })
  //       })

  //       setprofile(resultTasks)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  // }, [user])

  // useEffect(() => {
  //   fetchTasks()
  // }, [user])

  const [Name, setName] = useState()
  const [Email, setEmail] = useState()
  const [Mobile, setMobile] = useState()
  const [ImageUrl, setImageUrl] = useState()

  const navigate = useNavigate()

  const cleintRef = doc(db, 'users', 'hu4UOB1AzEbinu2bEtsJ')

  useEffect(() => {
    getDoc(cleintRef).then((doc) => {
      setName(doc.data().name)
      setEmail(doc.data().email)
      setMobile(doc.data().mobile)
      setImageUrl(doc.data().picture)
    })
  }, [])

  return (
    <Box
      p={0}
      sx={{
        height: 'calc(100vh - 64px)',
        padding: 2,
        marginTop: 8,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 6rem)',
          left: '108px',
          top: '88px',
          background: 'rgb(255, 255, 255)',
          borderRadius: '41px',
        }}
      >
        <Grid container sx={{ height: '90h' }}>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                height: '300px',
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                marginTop: '4rem',
                marginBottom: '1rem',
                background: ImageUrl
                  ? `url("${ImageUrl}")no-repeat center/cover`
                  : '#D9D9D9',
              }}
            >
              {/* <Avatar
                src='https://source.unsplash.com/oZEkYLYxzKI'
                sx={{ width: 256, height: 256 }}
              ></Avatar> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={5}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ mt: 2 }} component='h1' variant='h5'>
                About Me,
              </Typography>
              <Box sx={{ mt: 8 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id='name'
                      label='Name'
                      value={Name}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id='email'
                      label='Email'
                      value={Email}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id='telephone'
                      label='Telephone'
                      InputLabelProps={{ shrink: true }}
                      value={Mobile}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 6, mb: 2 }}
                  onClick={() => navigate('/client-profile-update')}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ClientProfileSubPage

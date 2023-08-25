import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'

import CardMedia from '@mui/material/CardMedia'
import { collection, getDoc, getDocs, doc } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'
import { db } from '../../firebase-config'

function BlogViewSubPage() {
  const location = useLocation()
  const [blogs, setBlogs] = useState([])
  const blogId = location.state.id

  useEffect(() => {
    const getBlogs = async () => {
      const data = doc(db, 'blogs', blogId)
      const docSnap = await getDoc(data)
      setBlogs(docSnap.data())
    }

    getBlogs()
  }, [])

  console.log('blogs', blogs)

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
          background: 'rgba(255, 255, 255, 0.73)',
          borderRadius: '41px',
        }}
      >
        <Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box
              sx={{
                width: '100%',
                height: 'calc(110vh - 11rem)',
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.73)',
                borderRadius: '20px',
                paddingTop: '4px',
                overflow: 'auto',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'white',
                  marginTop: '72px',
                  marginBottom: '64px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#2A3036',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}
            >
              <Card sx={{ maxWidth: '100%' }}>
                <CardMedia component='img' height='400' image={blogs.image} />
                {/* <CardHeader>
                  <Typography color='textPrimary'></Typography>
                </CardHeader> */}
                <CardContent>
                  <Typography variant='body2' color='textSecondary' mt={1}>
                    author: {blogs.author}
                  </Typography>
                  <Typography
                    color='textPrimary'
                    gutterBottom
                    variant='h5'
                    mt={2}
                  >
                    {blogs.title}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' mt={2}>
                    {blogs.content}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default BlogViewSubPage

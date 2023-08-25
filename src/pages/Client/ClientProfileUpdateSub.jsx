import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Close } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { db, storage } from '../../firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

function ClientProfileUpdateSub() {
  const navigate = useNavigate()

  const [selected, setSelected] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const [ImageURL, setImageURL] = useState('')

  const [Name, setName] = useState()
  const [Email, setEmail] = useState()
  const [Mobile, setMobile] = useState()

  const cleintRef = doc(db, 'users', 'hu4UOB1AzEbinu2bEtsJ')

  const ErrMsg = (errMsg) => {
    toast.error(errMsg, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  useEffect(() => {
    getDoc(cleintRef).then((doc) => {
      setName(doc.data().name)
      setEmail(doc.data().email)
      setMobile(doc.data().mobile)
      setImagePreview(doc.data().picture)
    })
  }, [])

  const updateProfile = async () => {
    const cleintDoc = doc(db, 'users', 'hu4UOB1AzEbinu2bEtsJ')

    if (selected === '' && imagePreview !== '') {
      if (Name === '') {
        ErrMsg('Please fill the required fields!')
      } else if (Email === '') {
        ErrMsg('Please fill the required fields!')
      } else if (Mobile === '') {
        ErrMsg('Please fill the required fields!')
      } else {
        const newData = {
          name: Name,
          email: Email,
          mobile: Mobile,
          picture: imagePreview,
        }

        await updateDoc(cleintDoc, newData).then(navigate('/client-profile'))
      }
    } else if (selected !== '' && imagePreview === null) {
      ErrMsg('Something wrong with the image preview')
    } else {
      const imageRef = ref(storage, `cleintProfile/${selected.name}`)
      if (selected === '') {
        ErrMsg('Cover image must be added!')
      } else {
        uploadBytes(imageRef, selected)
          .then(() => {
            getDownloadURL(imageRef).then((url) => {
              updateDoc(cleintDoc, { picture: url })
            })
          })
          .then()
        if (Name === '') {
          ErrMsg('Fill the required fields!')
        } else if (Email === '') {
          ErrMsg('Fill the required fields!')
        } else if (Mobile === '') {
          ErrMsg('Please select an album category!')
        } else {
          const newData = {
            name: Name,
            email: Email,
            mobile: Mobile,
            picture: ImageURL,
          }

          await updateDoc(cleintDoc, newData).then(navigate('/client-profile'))
        }
      }
    }
  }

  const handleImageChange = (e) => {
    const selected = e.target.files[0]
    setSelected(selected)
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(selected)
    } else {
      ErrMsg('File type is not supported!')
    }
  }

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
          <ToastContainer />
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
                background: imagePreview
                  ? `url("${imagePreview}")no-repeat center/cover`
                  : '#D9D9D9',
              }}
            >
              {!imagePreview && (
                <>
                  <label htmlFor='fileUpload'>Choose Cover</label>
                  <input
                    type='file'
                    id='fileUpload'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </>
              )}
            </Box>
            {imagePreview && (
              <>
                <Close
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setImagePreview(null)
                    setSelected('')
                  }}
                />
              </>
            )}
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
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id='email'
                      label='Email'
                      value={Email}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id='telephone'
                      label='Telephone'
                      value={Mobile}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  onClick={updateProfile}
                  sx={{ mt: 6, mb: 2 }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ClientProfileUpdateSub

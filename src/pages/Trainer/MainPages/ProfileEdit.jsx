
import { Close } from '@mui/icons-material'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppBarTrainer from '../../../components/Trainer/AppBarTrainer'
import { db } from '../../../firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { storage } from './../../../firebase-config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const ProfileEdit = () => {
  const navigate = useNavigate()

  const [selected, setSelected] = useState([])
  const [imagePreview, setImagePreview] = useState(null)

  const [Name, setName] = useState()
  const [Email, setEmail] = useState()
  const [Mobile, setMobile] = useState()
  const [About, setAbout] = useState()


  const trainerRef = doc(db, 'users', '5qO5w7dwRvzo3YeCoppe')


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
    getDoc(trainerRef).then((doc) => {
      setName(doc.data().name)
      setEmail(doc.data().email)
      setMobile(doc.data().mobile)
      setAbout(doc.data().description)
      setImagePreview(doc.data().picture)
    })
  }, [])

  const updateProfile = async () => {

    const trainerDoc = doc(db, 'users', '5qO5w7dwRvzo3YeCoppe');

    if (selected === '' && imagePreview === null) {
      ErrMsg('Please choose a cover image');
    } else if (selected === '' && imagePreview !== '') {
      /* this section handles if the user does not modify the image but other text fields*/
      if (Name === '') {
        ErrMsg('Please fill the required fields!');
      } else if (Email === '') {
        ErrMsg('Please fill the required fields!');
      } else if (Mobile === '') {
        ErrMsg('Please select an album category!');
      } else if (About === '') {
        ErrMsg('Please fill the required fields!');
      } else {
        const newFields = {
          name: Name,
          email: Email,
          mobile: Mobile,
          picture: imagePreview,
          description: About,
        }

        await updateDoc(trainerDoc, newFields).then(
          navigate('/trainer/profile')

        );
      }
    } else if (selected !== '' && imagePreview === null) {
      ErrMsg('Something wrong with the image preview');
    } else {
      //handle image upload and then update the document
      const imageRef = ref(storage, `TrainerProfile/${selected.name}`);
      if (selected === '') {
        ErrMsg('Cover image must be added!');

      } else {
        uploadBytes(imageRef, selected).then(() => {
          getDownloadURL(imageRef).then((url) => {
            if (Name === '') {

              ErrMsg('Fill the required fields!')
            } else if (url === '') {
              ErrMsg('Cover URL Error!')
            } else if (Email === '') {
              ErrMsg('Fill the required fields!')
            } else if (Mobile === '') {
              ErrMsg('Please select an album category!')
            } else if (About === '') {
              ErrMsg('Fill the required fields!')

            } else {
              const newFields = {
                name: Name,
                email: Email,
                mobile: Mobile,

                description: About,
              }

              updateDoc(trainerDoc, newFields).then(
                navigate('/trainer/profile')

              )

            }
          })
        })
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
    <Box sx={{ height: '100vh' }}>
      <AppBarTrainer trainerName='Hi, Randy!' />
      <ToastContainer />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
        }}
      >
        <Box
          sx={{
            margin: '5rem 5rem 1rem',
            backgroundColor: '#F4F3F8',
            borderRadius: '1.5rem',
            boxShadow: 12,
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              padding: '2rem 4rem',
            }}
          >
            <Grid container spacing={2}>
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

              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h4' sx={{ fontWeight: 500 }}>
                  <span style={{ color: '#3C56F5' }}>About</span> Me,
                </Typography>
                <TextField
                  sx={{ width: '100%', marginTop: '3rem' }}
                  id='outlined-basic'
                  label='Name'
                  variant='outlined'
                  value={Name}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setName(e.target.value)}
                />
                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                  <TextField
                    sx={{ width: '100%', marginTop: '3rem' }}
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    value={Email}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    sx={{ width: '100%', marginTop: '3rem' }}
                    id='outlined-basic'
                    label='Mobile'
                    variant='outlined'

                    value={Mobile}

                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Box>
                <TextField
                  sx={{ width: '100%', marginTop: '3rem' }}
                  id='outlined-multiline-static'
                  label='About'
                  multiline
                  rows={5}
                  value={About}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <Button
                  sx={{
                    height: '40px',
                    width: '100%',
                    backgroundColor: '#3C56F5',
                    marginTop: '3rem',
                  }}
                  variant='contained'
                  onClick={updateProfile}
                >
                  update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileEdit

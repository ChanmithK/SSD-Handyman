import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const schedulesCollectionRef = collection(db, 'shedules')

function SchedulesSubPage() {
  const navigate = useNavigate()
  const [schedules, setSchedules] = useState([])
  const [data, setData] = useState('')
  const userNew = useSelector((state) => state.setUserData.userData)

  useEffect(() => {
    if (userNew) {
      const userID = JSON.parse(userNew)
      setData(userID)
    }
  }, [userNew])

  useEffect(() => {
    const getSchedules = async () => {
      const filterdData = query(
        schedulesCollectionRef,
        where('clientID', '==', data.user)
      )
      const querySnapshot = await getDocs(filterdData)
      setSchedules(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    }
    getSchedules()
  }, [data])

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
          background: 'rgba(255, 255, 255, 0.73)',
          borderRadius: '41px',
          position: 'relative',
        }}
      >
        <Box sx={{ padding: 4 }}>
          <Box
            sx={{
              bgcolor: '#F4F3F8',
              height: '38vh',
              borderRadius: '15px',
              padding: 2,
            }}
          >
            <Box>
              <Box sx={{ marginBottom: 1 }}>
                <Typography
                  variant='h8'
                  sx={{ fontWeight: 'bold', fontSize: '17.5px' }}
                >
                  Meal Plan
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 'calc(100vh - 32rem)',
                  overflow: 'auto',
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': {
                    width: '0.4em',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f2f2f5',
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
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, bgcolor: '#F4F3F8' }}
                    aria-label='simple table'
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Schedule ID</TableCell>
                        <TableCell align='right'>Trainer Name</TableCell>
                        <TableCell align='right'>Date</TableCell>
                        <TableCell align='right'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedules.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                            height: '1px',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            // navigate("/view-order");
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {row.scheduleID}
                          </TableCell>
                          <TableCell align='right'>{row.trainerName}</TableCell>
                          <TableCell align='right'>{row.date}</TableCell>
                          <TableCell align='right'>
                            <IconButton
                              sx={{ color: '#3C56F5' }}
                              onClick={() => {
                                navigate(`/client-workout-schedule-report`, {
                                  state: { id: row.id },
                                })
                              }}
                            >
                              <FileDownloadOutlinedIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: '#F4F3F8',
              height: '38vh',
              borderRadius: '15px',
              padding: 2,
              marginTop: '12px',
            }}
          >
            <Box>
              <Box sx={{ marginBottom: 1 }}>
                <Typography
                  variant='h8'
                  sx={{ fontWeight: 'bold', fontSize: '17.5px' }}
                >
                  Meal Plan
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 'calc(100vh - 32rem)',
                  overflow: 'auto',
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': {
                    width: '0.4em',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f2f2f5',
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
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, bgcolor: '#F4F3F8' }}
                    aria-label='simple table'
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Schedule ID</TableCell>
                        <TableCell align='right'>Trainer Name</TableCell>
                        <TableCell align='right'>Date</TableCell>
                        <TableCell align='right'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedules.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                            height: '1px',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            // navigate("/view-order");
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {row.scheduleID}
                          </TableCell>
                          <TableCell align='right'>{row.trainerName}</TableCell>
                          <TableCell align='right'>{row.date}</TableCell>
                          <TableCell align='right'>
                            <IconButton
                              sx={{ color: '#3C56F5' }}
                              onClick={() => {
                                navigate(`/client-meal-plan-report`, {
                                  state: { id: row.id },
                                })
                              }}
                            >
                              <FileDownloadOutlinedIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SchedulesSubPage

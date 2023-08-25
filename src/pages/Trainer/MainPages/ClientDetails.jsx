import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBarTrainer from '../../../components/Trainer/AppBarTrainer';
import { db } from '../../../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ClientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const ErrMsg = (errMsg) => {
    toast.error(errMsg, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [workoutPlan, setWorkoutPlan] = useState(location.state.workout);
  const [mealPlan, setMealPlan] = useState(location.state.meal);
  const [myDescription, setMyDescription] = useState(
    location.state.trainerDesc
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function createData(name, weight, height, goal, program, phone, email) {
    return { name, weight, height, goal, program, phone, email };
  }

  const id = location.state.id;
  const trainerId = location.state.trainerId;
  const orderId = location.state.orderId;
  const clientId = location.state.clientId;
  const name = location.state.name;
  const date = location.state.date;
  const description = location.state.description;
  const email = location.state.email;
  const goal = location.state.goal;
  const height = location.state.height;
  const weight = location.state.weight;
  const image = location.state.image;
  const phone = location.state.phone;
  const programme = location.state.programme;

  const rows = [
    createData(name, weight, height, goal, programme, phone, email),
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ffff',
    boxShadow: 24,
    p: 3,
  };

  const updatePlan = async () => {
    const clientDoc = doc(db, 'clients', id);
    const newFields = {
      mealPlan: mealPlan,
      trainerDescription: myDescription,
      workoutPlan: workoutPlan,
    };
    if (workoutPlan === '' || mealPlan === '' || myDescription === '') {
      ErrMsg('Please fill all the fields');
    } else {
      await updateDoc(clientDoc, newFields).then(navigate(`/trainer/clients`));
    }
  };

  return (
    <Box>
      <AppBarTrainer trainerName='Hi, Randy!'></AppBarTrainer>
      <Box sx={{ margin: '5rem 5rem 1rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='h4'
            sx={{ color: '#2A3036', fontWeight: '400', marginBottom: '5rem' }}
          >
            Client Details
          </Typography>
          <ToastContainer />
        </Box>
        <Box sx={{ marginBottom: '4rem' }}>
          <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left' sx={{ color: '#2A3036' }}>
                    Name
                  </TableCell>

                  <TableCell align='left' sx={{ color: '#2A3036' }}>
                    Weight&nbsp;(kg)
                  </TableCell>
                  <TableCell align='left' sx={{ color: '#2A3036' }}>
                    Height&nbsp;(cm)
                  </TableCell>
                  <TableCell align='left' sx={{ color: '#2A3036' }}>
                    Goal
                  </TableCell>
                  <TableCell align='left' sx={{ color: '#2A3036' }}>
                    Program
                  </TableCell>
                  <TableCell align='left' sx={{ color: '#2A3036' }}>
                    Phone
                  </TableCell>
                  <TableCell align='left' sx={{ color: '#2A3036' }}>
                    Email
                  </TableCell>
                  <TableCell align='left' sx={{ color: '#2A3036' }}>
                    Image
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>

                    <TableCell align='left'>{row.weight}</TableCell>
                    <TableCell align='left'>{row.height}</TableCell>
                    <TableCell align='left'>{row.goal}</TableCell>

                    <TableCell align='left'>{row.program}</TableCell>

                    <TableCell align='left'>{row.phone}</TableCell>

                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>
                      <Button variant='outlined' onClick={handleOpen}>
                        view
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TextField
          sx={{ width: '100%' }}
          id='outlined-multiline-static'
          label='Client Description'
          multiline
          rows={4}
          defaultValue={description}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          sx={{ width: '100%', marginTop: '2rem' }}
          id='outlined-multiline-static'
          label='Workout Plan'
          multiline
          rows={5}
          defaultValue={workoutPlan}
          onChange={(e) => setWorkoutPlan(e.target.value)}
        />

        <TextField
          sx={{ width: '100%', marginTop: '2rem' }}
          id='outlined-multiline-static'
          label='Meal Plan'
          multiline
          rows={5}
          defaultValue={mealPlan}
          onChange={(e) => setMealPlan(e.target.value)}
        />

        <TextField
          sx={{ width: '100%', marginTop: '2rem' }}
          id='outlined-multiline-static'
          label='My Description'
          multiline
          rows={5}
          defaultValue={myDescription}
          onChange={(e) => setMyDescription(e.target.value)}
        />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box
              sx={{
                background: `url("${image}")no-repeat center/cover`,
                height: '400px',
                width: '400',
              }}
            ></Box>
          </Box>
        </Modal>

        <Box sx={{ display: 'flex', gap: 4, marginTop: '3rem' }}>
          <Button
            sx={{ height: '40px', width: '130px', backgroundColor: '#2A3036' }}
            variant='contained'
            onClick={() => navigate('/trainer/clients')}
          >
            Back
          </Button>
          <Button
            sx={{ height: '40px', width: '130px', backgroundColor: '#3C56F5' }}
            variant='contained'
            onClick={() => {
              confirmAlert({
                message: 'Are you sure to update?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {
                      updatePlan();
                    },
                  },
                  {
                    label: 'No',
                  },
                ],
              });
            }}
          >
            update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDetails;

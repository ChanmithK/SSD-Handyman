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
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const OrderDetaills = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function createData(name, weight, height, goal, program, phone, email) {
    return { name, weight, height, goal, program, phone, email };
  }

  const orderId = location.state.id;
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
  const trainer = location.state.trainerId;

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

  const updateStatus = async () => {
    const orderDoc = doc(db, 'orders', orderId);
    const newFields = {
      status: 'proceed',
    };
    await updateDoc(orderDoc, newFields).then(
      navigate(`/trainer/create-plan/${orderId}`, {
        state: {
          orderId: orderId,
          clientId: clientId,
          name: name,
          date: date,
          description: description,
          email: email,
          goal: goal,
          height: height,
          weight: weight,
          image: image,
          phone: phone,
          programme: programme,
          trainer: trainer,
        },
      })
    );
  };

  const rejectStatus = async () => {
    const orderDoc = doc(db, 'orders', orderId);
    const newFields = {
      status: 'reject',
    };
    await updateDoc(orderDoc, newFields).then(navigate('/trainer/orders'));
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
            Order Details
          </Typography>
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
          label='Description'
          multiline
          rows={5}
          defaultValue={description}
          InputProps={{
            readOnly: true,
          }}
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
            onClick={() => {
              confirmAlert({
                message: 'Are you sure to reject?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {
                      rejectStatus();
                    },
                  },
                  {
                    label: 'No',
                  },
                ],
              });
            }}
          >
            Reject
          </Button>
          <Button
            sx={{ height: '40px', width: '130px', backgroundColor: '#3C56F5' }}
            variant='contained'
            onClick={() => {
              confirmAlert({
                message: 'Are you sure to accept?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {
                      updateStatus();
                    },
                  },
                  {
                    label: 'No',
                  },
                ],
              });
            }}
          >
            Accept
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetaills;

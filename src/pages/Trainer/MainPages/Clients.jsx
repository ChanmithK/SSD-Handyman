import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBarTrainer from '../../../components/Trainer/AppBarTrainer';

const Clients = () => {
  const [clients, setClients] = useState([]);

  const navigate = useNavigate();

  const clientRef = collection(db, 'clients');
  const q = query(clientRef, where('trainerId', '==', '5qO5w7dwRvzo3YeCoppe'));

  useEffect(() => {
    const getClients = async () => {
      const data = await getDocs(q);

      setClients(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getClients();
  }, []);

  return (
    <div>
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
            Clients
          </Typography>
          <Button
            variant='contained'
            sx={{ height: '40px', width: '130px', backgroundColor: '#3C56F5' }}
            onClick={() => navigate('/trainer/report')}
          >
            report
          </Button>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table
                sx={{ minWidth: 650 }}
                stickyHeader
                aria-label='sticky table'
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align='left'>Name</TableCell>
                    <TableCell align='left'>Email</TableCell>
                    <TableCell align='left'>Phone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        navigate(`/trainer/clients/${row.orderId}`, {
                          state: {
                            id: row.id,
                            trainerId: row.trainerId,
                            orderId: row.orderId,
                            clientId: row.clientId,
                            name: row.name,
                            date: row.date,
                            description: row.clientDescription,
                            email: row.email,
                            goal: row.goal,
                            height: row.height,
                            weight: row.weight,
                            image: row.image,
                            phone: row.phone,
                            programme: row.programme,
                            meal: row.mealPlan,
                            workout: row.workoutPlan,
                            trainerDesc: row.trainerDescription,
                          },
                        })
                      }
                    >
                      <TableCell align='left'>{row.clientId}</TableCell>
                      <TableCell align='left'>{row.name}</TableCell>
                      <TableCell align='left'>{row.email}</TableCell>
                      <TableCell align='left'>{row.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default Clients;

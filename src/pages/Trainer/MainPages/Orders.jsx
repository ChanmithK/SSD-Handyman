import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AppBarTrainer from '../../../components/Trainer/AppBarTrainer';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [Orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const orderRef = collection(db, 'orders');
  const q = query(
    orderRef,
    where('trainerId', '==', '5qO5w7dwRvzo3YeCoppe'),
    where('status', '==', 'pending')
  );

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(q);

      setOrders(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getOrders();
  }, []);

  return (
    <div>
      <AppBarTrainer trainerName='Hi, Randy!' />
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
            Orders
          </Typography>
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
                  {Orders.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        navigate(`/trainer/orders/${row.orderId}`, {
                          state: {
                            id: row.id,
                            trainerId: row.trainerId,
                            orderId: row.orderId,
                            clientId: row.clientId,
                            name: row.clientName,
                            date: row.date,
                            description: row.description,
                            email: row.email,
                            goal: row.goal,
                            height: row.height,
                            weight: row.weight,
                            image: row.image,
                            phone: row.phone,
                            programme: row.programme,
                          },
                        })
                      }
                    >
                      <TableCell align='left'>{row.orderId}</TableCell>
                      <TableCell align='left'>{row.clientName}</TableCell>
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

export default Orders;

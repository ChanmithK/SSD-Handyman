import React, { useEffect, useState } from 'react';
import AppBarTrainer from '../../../components/Trainer/AppBarTrainer';
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
  TextField,
  Typography,
} from '@mui/material';
import { db } from '../../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
  const navigate = useNavigate();
  const packageRef = collection(db, 'packages');
  const [Packages, setPackages] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const q = query(packageRef, where('trainerId', '==', '5qO5w7dwRvzo3YeCoppe'));

  useEffect(() => {
    const getPackages = async () => {
      const data = await getDocs(q);
      let packageData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPackages(packageData);

      setSearchList(packageData);
    };

    getPackages();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'program', headerName: 'Program', flex: 0.3 },
    { field: 'duration', headerName: 'Duration', flex: 0.3 },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.2,
      align: 'left',
      headerAlign: 'left',
    },
  ];

  const filterPackages = (e) => {
    setSearchKey(e);
    setPackages(
      searchList.filter((item) =>
        item.name.toLowerCase().startsWith(e.toLowerCase())
      )
    );
  };

  return (
    <div>
      <AppBarTrainer trainerName='Hi, Randy!'></AppBarTrainer>
      <Box sx={{ margin: '5rem 5rem 1rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <Typography
            variant='h4'
            sx={{ color: '#2A3036', fontWeight: '400', marginBottom: '5rem' }}
          >
            Packages
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              id='outlined-basic'
              label='Search'
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              size='small'
              value={searchKey}
              onInput={(e) => {
                filterPackages(e.target.value);
              }}
            />
            <Button
              variant='contained'
              sx={{
                height: '40px',
                width: '130px',
                backgroundColor: '#3C56F5',
              }}
              onClick={() => navigate('/trainer/package-create')}
            >
              add
            </Button>
          </Box>
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
                    <TableCell align='left'>Program</TableCell>
                    <TableCell align='left'>Duration</TableCell>
                    <TableCell align='left'>Price&nbsp;(LKR)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Packages.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        navigate('/trainer/package-edit', {
                          state: {
                            id: row.id,
                            name: row.name,
                            duration: row.duration,
                            price: row.price,
                            description: row.description,
                          },
                        })
                      }
                    >
                      <TableCell align='left'>{row.packageID}</TableCell>
                      <TableCell align='left'>{row.name}</TableCell>
                      <TableCell align='left'>{row.duration}</TableCell>
                      <TableCell align='left'>{row.price}</TableCell>
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

export default Packages;

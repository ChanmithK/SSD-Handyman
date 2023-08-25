import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBarTrainer from '../../../components/Trainer/AppBarTrainer';
import { db } from '../../../firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Plan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState('');
  const [meal, setMeal] = useState('');
  const [description, setDescription] = useState('');

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

  const orderId = location.state.orderId;
  const clientId = location.state.clientId;
  const name = location.state.name;
  const date = location.state.date;
  const desc = location.state.description;
  const email = location.state.email;
  const goal = location.state.goal;
  const height = location.state.height;
  const weight = location.state.weight;
  const image = location.state.image;
  const phone = location.state.phone;
  const programme = location.state.programme;
  const trainer = location.state.trainer;

  var today = new Date();
  // returns year as YY
  var year = today.getFullYear().toString();
  // returns month
  var month;
  var month = parseInt(today.getMonth().toString());
  month = month + 1;
  month = month.toString();
  if (month.length == 1) {
    month = '0' + month;
  }
  // returns day
  var day = today.getDate().toString();
  if (day.length == 1) {
    day = '0' + day;
  }
  // returns hours
  var hours = today.getHours().toString();
  if (hours.length == 1) {
    hours = '0' + hours;
  }
  // returns minutes
  var minutes = today.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = '0' + minutes;
  }
  // returns seconds
  var seconds = today.getSeconds().toString();
  if (seconds.length == 1) {
    seconds = '0' + seconds;
  }
  // returns formatted date
  var formatedDate =
    year.substr(2, 3) + month + day + '.' + hours + minutes + seconds;
  const clientID = parseFloat(formatedDate);

  const clientsRef = collection(db, 'clients');

  const createPlan = async () => {
    if (workout === '') {
      ErrMsg('Fill all the required fields!');
    } else if (meal === '') {
      ErrMsg('Fill all the required fields!');
    } else if (description === '') {
      ErrMsg('Fill all the required fields!');
    } else {
      await addDoc(clientsRef, {
        clientId: clientID,
        orderId: orderId,
        name: name,
        date: date,
        clientDescription: desc,
        email: email,
        goal: goal,
        height: height,
        weight: weight,
        image: image,
        phone: phone,
        programme: programme,
        trainerId: trainer,
        workoutPlan: workout,
        mealPlan: meal,
        trainerDescription: description,
      }).then(navigate('/trainer/orders'));
    }
  };

  return (
    <Box>
      <AppBarTrainer trainerName='Hi, Randy!'></AppBarTrainer>
      <Box sx={{ margin: '5rem 5rem 1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToastContainer />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-multiline-static'
            label='Workout Plan'
            multiline
            rows={5}
            onChange={(e) => setWorkout(e.target.value)}
          />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-multiline-static'
            label='Meal Plan'
            multiline
            rows={5}
            onChange={(e) => setMeal(e.target.value)}
          />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-multiline-static'
            label='Description'
            multiline
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Button
          sx={{
            height: '40px',
            width: '200px',
            backgroundColor: '#3C56F5',
            marginTop: '3rem',
          }}
          variant='contained'
          onClick={createPlan}
        >
          send
        </Button>
      </Box>
    </Box>
  );
};

export default Plan;

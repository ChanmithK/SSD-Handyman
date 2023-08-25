import React, { useState, useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { useLocation } from 'react-router-dom'
import { db } from '../../../firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { Box, Typography } from '@mui/material'

const theadStyle = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  fontStyle: 'normal',
}

const thStyle = {
  paddingLeft: '50px',
  paddingTop: '5px',
  fontWeight: '700',
}

const heading = {
  left: 'auto',
  paddingTop: '1px',
  paddingLeft: '230px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '900',
  fontSize: '37px',
  textAlign: 'left',
  color: '#3178d4',
}

const tdStyle = {
  paddingLeft: '50px',
  paddingTop: '10px',
}

const button = {
  left: '100px',
  width: '160px',
  padding: '10px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '17px',
  textAlign: 'center',
  color: 'white',
  backgroundColor: '#2A3036',
  border: 'none',
  borderRadius: '12px',
}

const body = {
  backgroundColor: 'white',
  width: '100vw',
  height: '100vh',
  paddingLeft: '40px',
  paddingTop: '40px',
}

const Example = React.forwardRef((props, ref) => {
  const [rows, setRows] = useState([])
  const location = useLocation()
  const scheduleId = location.state.id

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, 'shedules', scheduleId)
      const docSnap = await getDoc(userDoc)
      setRows(docSnap.data())
    }
    fetchData()
  }, [])

  return (
    <div ref={ref}>
      <p style={heading}>Meal Plan Report</p>

      <table style={{ maxWidth: '90%' }}>
        <thead style={theadStyle}>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Trainer Phone</th>
          <th style={thStyle}>Trainer Email</th>
          <th style={thStyle}>Trainer Name</th>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{rows.date}</td>
            <td style={tdStyle}>{rows.trainerPhone}</td>
            <td style={tdStyle}>{rows.trainerEmail}</td>
            <td style={tdStyle}>{rows.trainerName}</td>
          </tr>
        </tbody>
      </table>

      <Box
        sx={{
          ml: 5,
          mt: 3,
        }}
      >
        <Typography>
          <h3 style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
            Meal Plan
          </h3>
          {rows.mealPlan
            ? rows.mealPlan.map((item, index) => (
                <Typography sx={{ ml: 2 }} key={index}>
                  {index + 1}. {item}
                </Typography>
              ))
            : null}
        </Typography>
      </Box>
    </div>
  )
})

const MealPlanReport = () => {
  const componentRef = useRef()
  return (
    <div style={body}>
      <ReactToPrint
        trigger={() => <button style={button}>Print</button>}
        content={() => componentRef.current}
      />
      <Example ref={componentRef} />
    </div>
  )
}
export default MealPlanReport

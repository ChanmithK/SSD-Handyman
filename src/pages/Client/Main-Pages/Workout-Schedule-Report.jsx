import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useLocation } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { Box, TextField, Typography } from "@mui/material";

const theadStyle = {
  fontFamily: "poppins",
  fontWeight: "bold",
  fontStyle: "normal",
};

const thStyle = {
  paddingLeft: "50px",
  paddingTop: "5px",
};

const heading = {
  left: "auto",
  paddingTop: "1px",
  paddingLeft: "50px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "37px",
  textAlign: "left",
  color: "#125465",
};

const trStyle = {
  fontFamily: "poppins",
  fontWeight: "normal",
  fontStyle: "normal",
};

const tdStyle = {
  paddingLeft: "50px",
  paddingTop: "10px",
};

const button = {
  left: "100px",
  width: "160px",
  padding: "8px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "17px",
  textAlign: "center",
  color: "white",
  backgroundColor: "#054fc7",
  border: "none",
  borderRadius: "12px",
};

const body = {
  backgroundColor: "white",
  width: "100vw",
  height: "100vh",
  paddingLeft: "40px",
  paddingTop: "40px",
};

const Example = React.forwardRef((props, ref) => {
  const [rows, setRows] = useState([]);
  const location = useLocation();
  const scheduleId = location.state.id;

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "shedules", scheduleId);
      const docSnap = await getDoc(userDoc);
      setRows(docSnap.data());
    }
    fetchData();
  }, []);
  // console.log(rows.workoutPlan);
  return (
    <div ref={ref}>
      <p style={heading}>Workout Schedule Report - FitFlame</p>

      <table style={{ maxWidth: "90%" }}>
        <thead style={theadStyle}>
          <th style={thStyle}>Trainer ID</th>
          <th style={thStyle}>Trainer Name</th>
          <th style={thStyle}>Trainer Phone</th>
          <th style={thStyle}>Trainer Email</th>
          <th style={thStyle}>Date</th>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{rows.trainerID}</td>
            <td style={tdStyle}>{rows.trainerName}</td>
            <td style={tdStyle}>{rows.trainerPhone}</td>
            <td style={tdStyle}>{rows.trainerEmail}</td>
            <td style={tdStyle}>{rows.date}</td>
          </tr>
        </tbody>
      </table>

      {/* <TextField
        id="outlined-multiline-flexible"
        label="Description"
        sx={{ width: "60%", marginLeft: 5, marginTop: 5 }}
        multiline
        rows={10}
        value={rows.description}
        size="small"
        inputProps={{ readOnly: true }}
        InputLabelProps={{ shrink: true }}
      /> */}
      {/* <TextField
        id="outlined-multiline-flexible"
        label="Schedule"
        sx={{ width: "90%", marginLeft: 5, marginTop: 5 }}
        multiline
        rows={6}
        value={rows.workoutPlan}
        size="small"
        inputProps={{ readOnly: true }}
        InputLabelProps={{ shrink: true }}
      /> */}
      <Box
        sx={{
          ml: 5,
          mt: 3,
        }}
      >
        <Typography>
          <h3 style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
            Description
          </h3>
          <Typography sx={{ ml: 2, width: "90%" }}>
            {rows.description}
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          ml: 5,
          mt: 3,
        }}
      >
        <Typography>
          <h3 style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
            Workout Schedule
          </h3>
          {rows.workoutPlan
            ? rows.workoutPlan.map((item, index) => (
                <Typography sx={{ ml: 2 }} key={index}>
                  {index + 1}. {item}
                </Typography>
              ))
            : null}
        </Typography>
      </Box>
    </div>
  );
});

const WorkoutScheduleReport = () => {
  const componentRef = useRef();
  return (
    <div style={body}>
      <ReactToPrint
        trigger={() => <button style={button}>Print</button>}
        content={() => componentRef.current}
      />
      <Example ref={componentRef} />
    </div>
  );
};

export default WorkoutScheduleReport;

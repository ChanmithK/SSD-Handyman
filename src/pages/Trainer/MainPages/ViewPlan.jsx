import React from "react";
import { Box, Button, TextField } from "@mui/material";
import AppBarTrainer from "../../../components/Trainer/AppBarTrainer";

const ViewPlan = () => {
  return (
    <Box>
      <AppBarTrainer trainerName="Hi, Randy!"></AppBarTrainer>
      <Box sx={{ margin: "5rem 5rem 1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-multiline-static"
            label="Workout Plan"
            multiline
            rows={5}
          />
          <TextField
            sx={{ width: "100%" }}
            id="outlined-multiline-static"
            label="Meal Plan"
            multiline
            rows={5}
          />
          <TextField
            sx={{ width: "100%" }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={5}
          />
        </Box>
        <Box sx={{ marginTop: "3rem", display: "flex", gap: 3 }}>
          <Button
            sx={{ height: "40px", width: "130px", backgroundColor: "#2A3036" }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            sx={{
              height: "40px",
              width: "130px",
              backgroundColor: "#3C56F5",
            }}
            variant="contained"
          >
            update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPlan;

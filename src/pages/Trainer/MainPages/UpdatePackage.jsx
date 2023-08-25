import { Close } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBarTrainer from "../../../components/Trainer/AppBarTrainer";
import picture from "../../../images/personalTraining.webp";
import { db } from "../../../firebase-config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UpdatePackage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const ErrMsg = (errMsg) => {
    toast.error(errMsg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const name = location.state.name;
  const duration = location.state.duration;
  const price = location.state.price;
  const description = location.state.description;
  const id = location.state.id;

  const imagePreview = picture;
  const [Name, setName] = useState(name);
  const [Duration, setDuration] = useState(duration);
  const [Price, setPrice] = useState(price);
  const [Description, setDescription] = useState(description);

  const updatePackage = async () => {
    // getting specific user document with user ID
    const packageDoc = doc(db, "packages", id);
    if (Name === "") {
      ErrMsg("Fields cannot be empty!");
    } else if (Duration === "") {
      ErrMsg("Fields cannot be empty!");
    } else if (Description === "") {
      ErrMsg("Fields cannot be empty!");
    } else if (price === 0 || price === null) {
      ErrMsg("Fields cannot be empty!");
    } else {
      const newFields = {
        name: Name,
        duration: Duration,
        price: Price,
        description: Description,
      };
      await updateDoc(packageDoc, newFields).then(
        navigate("/trainer/packages")
      );
    }
  };

  const deletePackage = async () => {
    const packageDoc = doc(db, "packages", id);
    confirmAlert({
      message: "Are you sure to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteDoc(packageDoc).then(navigate("/trainer/packages"));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <AppBarTrainer trainerName="Hi, Randy!" />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80%",
        }}
      >
        <ToastContainer />
        <Box
          sx={{
            margin: "5rem 5rem 1rem",
            backgroundColor: "#F4F3F8",
            borderRadius: "1.5rem",
            boxShadow: 12,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "2rem 4rem",
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    height: "300px",
                    width: "300px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    marginTop: "4rem",
                    marginBottom: "1rem",
                    background: imagePreview
                      ? `url("${imagePreview}")no-repeat center/cover`
                      : "#D9D9D9",
                  }}
                ></Box>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                  <span style={{ color: "#3C56F5" }}>Edit</span> Package,
                </Typography>
                <TextField
                  sx={{ width: "100%", marginTop: "3rem" }}
                  id="outlined-basic"
                  label="Package"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <TextField
                    sx={{ width: "100%", marginTop: "3rem" }}
                    id="outlined-basic"
                    label="Duration"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={Duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <TextField
                    sx={{ width: "100%", marginTop: "3rem" }}
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={Price}
                    onChange={(e) => setPrice(e.target.value.toString())}
                  />
                </Box>
                <TextField
                  sx={{ width: "100%", marginTop: "3rem" }}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={5}
                  InputLabelProps={{ shrink: true }}
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  sx={{
                    height: "40px",
                    width: "100%",
                    backgroundColor: "#2A3036",
                    marginTop: "3rem",
                  }}
                  variant="contained"
                  onClick={deletePackage}
                >
                  delete
                </Button>
                <Button
                  sx={{
                    height: "40px",
                    width: "100%",
                    backgroundColor: "#3C56F5",
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  onClick={updatePackage}
                >
                  update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdatePackage;

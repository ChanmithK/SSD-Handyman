import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBarTrainer from "../../../components/Trainer/AppBarTrainer";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Mobile, setMobile] = useState();
  const [About, setAbout] = useState();
  const [ImageUrl, setImageUrl] = useState();

  const navigate = useNavigate();

  const trainerRef = doc(db, "users", "5qO5w7dwRvzo3YeCoppe");

  useEffect(() => {
    getDoc(trainerRef).then((doc) => {
      setName(doc.data().name);
      setEmail(doc.data().email);
      setMobile(doc.data().mobile);
      setAbout(doc.data().description);
      setImageUrl(doc.data().picture);
    });
  }, []);

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
                    background: ImageUrl
                      ? `url("${ImageUrl}")no-repeat center/cover`
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
                  <span style={{ color: "#3C56F5" }}>About</span> Me,
                </Typography>
                <TextField
                  sx={{ width: "100%", marginTop: "3rem" }}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={Name}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <TextField
                    sx={{ width: "100%", marginTop: "3rem" }}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={Email}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    sx={{ width: "100%", marginTop: "3rem" }}
                    id="outlined-basic"
                    label="Mobile"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={"0" + Mobile}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <TextField
                  sx={{ width: "100%", marginTop: "3rem" }}
                  id="outlined-multiline-static"
                  label="About"
                  multiline
                  rows={5}
                  value={About}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  sx={{
                    height: "40px",
                    width: "100%",
                    backgroundColor: "#3C56F5",
                    marginTop: "3rem",
                  }}
                  variant="contained"
                  onClick={() => navigate("/trainer/profile-edit")}
                >
                  edit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;

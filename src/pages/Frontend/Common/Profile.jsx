import React, { useRef } from "react";
import { Box, Grid } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { collection, getDoc, query, where, doc } from "@firebase/firestore";
import { db, getDB } from "../../../firebase-config";
import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";

const Profile = () => {
  const Profile = useRef({});

  const navigate = useNavigate();

  const userNew = useSelector((state) => state.setUserData.userData);

  console.log(userNew);

  return (
    <Box
      p={0}
      sx={{
        height: "calc(100vh - 64px)",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 6rem)",
          left: "108px",
          top: "88px",
          background: "rgb(255, 255, 255)",
          borderRadius: "41px",
        }}
      >
        <Grid container sx={{ height: "90h" }}>
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
                background: userNew?.[0]?.profileImage
                  ? `url("${userNew?.[0]?.profileImage}")no-repeat center/cover`
                  : "#D9D9D9",
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} sm={8} md={5}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  color: "#062b56",
                  textAlign: "center",
                  fontFamily: "Inter",
                }}
              >
                About Me
              </Typography>
              <Box sx={{ mt: 8 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="name"
                      label="Name"
                      value={userNew?.[0]?.name}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      value={userNew?.[0]?.email}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="telephone"
                      label="Telephone"
                      InputLabelProps={{ shrink: true }}
                      value={userNew?.[0]?.mobile}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 6, mb: 2 }}
                  onClick={() => navigate("/client-profile-update")}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;

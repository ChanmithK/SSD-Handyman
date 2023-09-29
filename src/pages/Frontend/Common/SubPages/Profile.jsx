import React, { useRef } from "react";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const userNew = useSelector((state) => state.setUserData.userData);

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
                background: userNew?.profileImage
                  ? `url("${userNew?.profileImage}")no-repeat center/cover`
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
                      id="email"
                      label="Email"
                      value={userNew?.email}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      id="name"
                      label="Name"
                      value={userNew?.name}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="Age"
                      label="Age"
                      InputLabelProps={{ shrink: true }}
                      value={userNew?.age}
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
                      value={userNew?.mobile}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="city"
                      label="City"
                      value={userNew?.city}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 6,
                    mb: 2,
                    backgroundColor: "#062b56",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#000000",
                      color: "#fff",
                    },
                  }}
                  onClick={() => navigate("/profile-edit")}
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

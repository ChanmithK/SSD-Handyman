import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import { useUserAuth } from "../../../Context/UserAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleButton from "react-google-button";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase-config";

const SignIn = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (data) => {
    loginUser(data);
  };

  const { Login, googleSignIn, user } = useUserAuth();
  const navigate = useNavigate();

  const loginUser = async (values) => {
    const { email, password } = values;

    try {
      await Login(email, password);
      // navigate("/view-gigs");
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        ErrMsg("The password you entered is wrong.");
      } else if (errorCode === "auth/user-not-found") {
        ErrMsg("The entered email doesn`t have an email");
      } else {
        ErrMsg(errorMessage);
      }
    }
  };
  //Broken Authentication Flaws - Praveen
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user != null) {
        const usersCollectionRef = collection(db, "users");
        const filteredData = query(
          usersCollectionRef,
          where("user", "==", user?.uid)
        );
        try {
          const querySnapshot = await getDocs(filteredData);
          let userDetailsData = {};
          querySnapshot.docs.forEach((doc) => {
            userDetailsData = {
              ...doc.data(),
              id: doc.id,
            };
          });
          if (userDetailsData.role === "Handyman") {
            navigate("/view-buyer-requests");
          } else {
            navigate("/view-gigs");
          }
        } catch (error) {
          // Handle any errors that occurred during fetching the data
          console.error("Error fetching user details:", error);
        }
      }
      // if (user != null) {
      //   console.log("user?.user?.uid", user.uid);
      //   navigate("/view-buyer-requests");
      // }
    };

    fetchData();
  }, [user]);

  const ErrMsg = (errMsg) => {
    toast.error(errMsg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={0} square>
        <ToastContainer />
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ mt: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar> */}
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "23px",
              color: "#062b56",
              display: "flex",
            }}
          >
            HANDY
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "23px",
                color: "#f96a20",
                ml: 0.5,
              }}
            >
              MAN
            </Typography>
          </Typography>
          <Typography
            sx={{
              mt: 2,
              fontFamily: "Inter",
              color: "#062b56",
              fontSize: 30,
              fontWeight: 600,
            }}
            component="h1"
            variant="h5"
          >
            Sign In
          </Typography>
          <Box noValidate sx={{ mt: 4 }}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <TextField
                {...register("email")}
                autoComplete="email"
                fullWidth
                id="email"
                type="email"
                label="Email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />

              <TextField
                {...register("password")}
                sx={{ mt: 4 }}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 5,
                  mb: 4,
                  backgroundColor: "#062b56",
                  fontFamily: "Inter",
                  color: "#fff",
                }}
              >
                Sign In
              </Button>
            </form>
            <GoogleButton onClick={handleGoogleSignIn} />
            <Grid container sx={{ mt: 5 }}>
              <Grid item xs>
                <Link
                  href="/reset-password"
                  sx={{
                    color: "#062b56",
                    fontFamily: "Inter",
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/signup"
                  sx={{
                    color: "#062b56",
                    fontFamily: "Inter",
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/character-illustration-home-improvement-concept_53876-43040.jpg?w=740&t=st=1695824615~exp=1695825215~hmac=1152bcdd6d8c917678fdbe16dcb143f483c03fef321cdb3aaeefba514649b946)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default SignIn;

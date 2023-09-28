import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import { db } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { useUserAuth } from "../../../Context/UserAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import zxcvbn from "zxcvbn";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function SignUp() {
  // form validation - Nilaksha
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name must contain only letters"),
    city: yup
      .string()
      .required("City is required")
      .matches(/^[a-zA-Z\s]*$/, "City must contain only letters"),
    age: yup
      .string()
      .required("Age is required")
      .matches(/^(1[89]|[2-9][0-9]|100)$/, "Age must be between 18 and 100"),
    mobile: yup
      .string()
      .required("Mobile is required")
      .matches(/^\d+$/, "Mobile must contain only digits")
      .min(10, "Mobile must be 10 digits")
      .max(10, "Mobile must be 10 digits"),
    role: yup.string().required("Role is required"),
    gender: yup.string().required("Gender is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (data) => {
    createUser(data);
  };

  const createUser = async (values) => {
    const { email, name, city, age, mobile, role, gender } = values;

    try {
      // await validationSchema.validate(values, { abortEarly: false });
      const result = zxcvbn(password);
      if (result.score < 2) {
        ErrMsg("Password is not strong enough");
        return;
      }

      // Sign up the user
      await signUp(email, password);
      const user = auth.currentUser;

      console.log(user);

      // Add user data to Firestore
      await addDoc(usersCollectionRef, {
        name,
        city,
        mobile,
        role,
        gender,
        email: user.email,
        age: Number(age),
        user: user.uid,
      });

      // Redirect to the sign-in page
      navigate("/");
    } catch (error) {
      // Handle validation errors
      console.log(error);
      ErrMsg(error.message);
    }
  };

  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const auth = getAuth();
  const usersCollectionRef = collection(db, "users");

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

  //password strength bar - vishara
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  //password strength bar - vishara
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const result = zxcvbn(newPassword);

    setPassword(newPassword);
    setPasswordStrength({
      score: result.score,
      feedback: result.feedback.suggestions.join(" "),
    });
  };

  //password strength bar - vishara
  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
      case 1:
        return "red";
      case 2:
        return "#93C572";
      case 3:
        return "#29AB87";
      // case 4:
      //   return "green";
      default:
        return "#3B7A57";
    }
  };

  //password strength bar - vishara
  const passwordStrengthBarStyle = {
    width: `${(passwordStrength.score + 0) * 25}%`, // Adjust the width based on the score
    height: "3px",
    backgroundColor: getPasswordStrengthColor(passwordStrength.score),
    transition: "width 0.3s",
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }} spacing={5}>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={0} square>
        <ToastContainer />

        <Box
          sx={{
            my: 4,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
            component="h1"
            sx={{
              mt: 2,
              fontFamily: "Inter",
              color: "#062b56",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register("email")}
                    name="email"
                    fullWidth
                    id="email"
                    label="Email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("name")}
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("city")}
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoFocus
                    error={Boolean(errors.city)}
                    helperText={errors.city?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="age"
                    fullWidth
                    id="age"
                    label="Age"
                    {...register("age")}
                    autoFocus
                    error={Boolean(errors.age)}
                    helperText={errors.age?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="mobile"
                    label="Mobile"
                    name="mobile"
                    {...register("mobile")}
                    autoFocus
                    error={Boolean(errors.mobile)}
                    helperText={errors.mobile?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+94</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} fullWidth>
                  <FormControl fullWidth>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      labelId="role"
                      id="role"
                      label="Role"
                      name="role"
                      {...register("role")}
                      autoFocus
                      error={Boolean(errors.role)}
                    >
                      <MenuItem value={"Handyman"}>Handyman</MenuItem>
                      <MenuItem value={"Customer"}>Customer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} fullWidth>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      name="gender"
                      id="gender"
                      label="Gender"
                      {...register("gender")}
                      autoFocus
                      error={Boolean(errors.gender)}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* password strength bar - vishara */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    {...register("password")}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password ? errors.password.message : null
                      // `Password Strength: ${passwordStrength.score} / 4`
                    }
                    onChange={(event) => handlePasswordChange(event)}
                  />
                  {passwordStrength.feedback ? (
                    <div
                      style={{
                        color: getPasswordStrengthColor(passwordStrength.score),
                        height: "40px",
                      }}
                    >
                      {passwordStrength.feedback}
                    </div>
                  ) : (
                    <div style={{ height: "40px" }}></div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: "5px",
                    }}
                  >
                    <div style={passwordStrengthBarStyle}></div>
                  </div>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#062b56",
                  fontFamily: "Inter",
                  color: "#fff",
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/signIn"
                    sx={{
                      color: "#062b56",
                      fontFamily: "Inter",
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
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
}

export default SignUp;

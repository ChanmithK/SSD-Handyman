import React, { useState } from "react";
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
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { useUserAuth } from "../../Context/UserAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import zxcvbn from "zxcvbn";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [NewRole, setNewRole] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newAge, setNewAge] = useState("");
  const [isError, setIsError] = useState(false);
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

  const createUser = async () => {
    if (newName === "") {
      ErrMsg("Fill the required fields!");
    } else if (newMobile === "") {
      ErrMsg("Fill the required fields!");
    } else if (NewRole === "") {
      ErrMsg("Fill the required fields!");
    } else if (newGender === "") {
      ErrMsg("Fill the required fields!");
    } else if (email === "") {
      ErrMsg("Fill the required fields!");
    } else if (newAge === "") {
      ErrMsg("Fill the required fields!");
    } else {
      await signUp(email, password)
        .then(() => {
          const user = auth.currentUser;
          addDoc(usersCollectionRef, {
            name: newName,
            mobile: newMobile,
            role: NewRole,
            gender: newGender,
            email: user.email,
            age: Number(newAge),
            user: user.uid,
          });
        })
        .then(navigate("/signIn"));
    }
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

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setMessage(event.target.value);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} onChange={handleChange}>
                <TextField
                  required
                  name="email"
                  fullWidth
                  id="email"
                  label="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={message}
                />
                {error && <p1 style={{ color: "red" }}>{error}</p1>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="age"
                  fullWidth
                  id="age"
                  label="Age"
                  onChange={(event) => {
                    setNewAge(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="tel"
                  value={newMobile}
                  error={isError}
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  onChange={(event) => {
                    setNewMobile(event.target.value);
                    if (event.target.value.length > 10) {
                      setIsError(true);
                    }
                  }}
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
                    required
                    labelId="role"
                    id="role"
                    value={NewRole}
                    label="Role"
                    onChange={(event) => {
                      setNewRole(event.target.value);
                    }}
                  >
                    <MenuItem value={"Client"}>Client</MenuItem>
                    <MenuItem value={"Trainer"}>Trainer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} fullWidth>
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    required
                    labelId="gender"
                    id="gender"
                    value={newGender}
                    label="Gender"
                    onChange={(event) => {
                      setNewGender(event.target.value);
                    }}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* password strength bar - vishara */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(event) => {
                    handlePasswordChange(event);
                    setPassword(event.target.value); // Set the password in state
                  }}
                />
                {passwordStrength.feedback && (
                  <div
                    style={{
                      color: getPasswordStrengthColor(passwordStrength.score),
                    }}
                  >
                    {passwordStrength.feedback}
                  </div>
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
              onClick={createUser}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  Already have an account? Sign in
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
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/oZEkYLYxzKI)",
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

export default SignUpForm;

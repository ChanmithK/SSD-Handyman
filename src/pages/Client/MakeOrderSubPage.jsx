import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./style.css";
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/Client/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MakeOrderSubPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userNew = useSelector((state) => state.setUserData.userData);

  const current = new Date();
  const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const location = useLocation();
  const trainerId = location.state.id;
  const trainerName = location.state.name;
  const trainerMobile = location.state.mobile;
  const trainerEmail = location.state.email;
  const selectedProgramme = location.state.programme;
  const price = location.state.price;
  const [data, setData] = useState("");

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState("nothing");

  const usersCollectionRef = collection(db, "orders");

  const ErrMsg = (errMsg) => {
    toast.error(errMsg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const createOrder = async () => {
    const IName = imageUpload.name + v4();
    if (weight === "") {
      ErrMsg("Weight field is required!");
    } else if (height === "") {
      ErrMsg("Height field is required!");
    } else if (goal === "") {
      ErrMsg("Goal field is required!");
    } else if (description === "") {
      ErrMsg("Description field is required!");
    } else if (imageUpload === "nothing") {
      ErrMsg("Please Upload a image!");
    } else {
      confirmAlert({
        message: "Are you sure to confirm this order ?",
        // message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              addDoc(usersCollectionRef, {
                weight: Number(weight),
                height: Number(height),
                goal: goal,
                description: description,
                programme: selectedProgramme,
                image: `${IName}`,
                trainerName: trainerName,
                trainerMobile: trainerMobile,
                trainerEmail: trainerEmail,
                trainerId: trainerId,
                date: currentDate,
                clientId: data.user,
                clientName: data.name,
                email: data.email,
                phone: data.mobile,
                price: price,
                status: "pending",
                orderId: Math.floor(1000 + Math.random() * 9000),
              });
              setIsLoading(true);
              if (imageUpload == null) {
                alert("No data");
                return;
              }
              const imageRef = ref(storage, `images/${IName}`);
              uploadBytes(imageRef, imageUpload);
              navigate("/trainers");
            },
          },
          {
            label: "No",
            // onClick: () => alert("Click No")
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (userNew) {
      const userID = JSON.parse(userNew);
      setData(userID);
    }
  }, [userNew]);

  const renderPage = (
    <Box
      p={0}
      sx={{
        height: "calc(100vh - 64px)",
        padding: 2,
        marginTop: 8,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 6rem)",
          background: "rgba(255, 255, 255, 0.73)",
          borderRadius: "41px",
          position: "relative",
        }}
      >
        <Box sx={{ padding: 4 }}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={data.name}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Age"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  InputLabelProps={{ shrink: true }}
                  value={data.age}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "21px" }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Weight(kg)"
                  variant="outlined"
                  type="number"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Height(cm)"
                  variant="outlined"
                  type="number"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "21px" }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Goal"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setGoal(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Programme"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={selectedProgramme}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setGoal(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "21px" }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              sx={{ width: "100%" }}
              multiline
              rows={4}
              size="lg"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Box>
          <Box
            className="ImageUploadContainer"
            sx={{
              marginTop: "15px",
              width: "30%",
              position: "relative",
              height: "20vh",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ position: "absolute" }}>
              <Grid container spacing={0.3}>
                <Grid item>
                  <ErrorOutlineIcon
                    sx={{ fontSize: "14px", marginTop: "6px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h7" sx={{ fontSize: "11px" }}>
                    Upload some of your recent image
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                component="label"
                sx={{ border: "1px solid #ccc!important", color: "#2A3036" }}
              >
                <input
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      const fileExtension = selectedFile.name
                        .split(".")
                        .pop()
                        .toLowerCase();
                      if (["jpg", "jpeg", "png"].includes(fileExtension)) {
                        setImageUpload(selectedFile);
                      } else {
                        alert("Please select a valid JPEG, JPG, or PNG image.");
                        e.target.value = null; // Clear the selected file input
                      }
                    }
                  }}
                  multiple
                  type="file"
                />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ padding: 4, position: "absolute", bottom: 0 }}>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                sx={{ background: "#2A3036" }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ background: "#3C56F5" }}
                onClick={createOrder}
              >
                Make Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );

  return <> {isLoading ? <LoadingSpinner message={""} /> : renderPage}</>;
}

export default MakeOrderSubPage;

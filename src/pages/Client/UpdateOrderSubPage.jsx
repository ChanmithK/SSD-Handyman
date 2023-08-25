import {
  Box,
  Button,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LoadingSpinner from "../../components/Client/LoadingSpinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { v4 } from "uuid";

function UpdateOrderSubPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state.orderId;
  const trainerName = location.state.trainerName;
  const trainerEmail = location.state.email;
  const orderDoc = doc(db, "orders", orderId);
  const [data, setData] = useState("");
  const [url, setURL] = useState("");

  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [goal, setGoal] = useState();
  const [programme, setProgramme] = useState();
  const [description, setDescription] = useState();
  const [checkImage, setCheckImage] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "orders", orderId);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();
    setWeight(data.weight);
    setHeight(data.height);
    setGoal(data.goal);
    setProgramme(data.programme);
    setDescription(data.description);
    setCheckImage(data.image);
  }, [
    data.height,
    data.weight,
    data.goal,
    data.programme,
    data.description,
    data.image,
    orderId,
  ]);

  const storage = getStorage();

  if (checkImage !== null) {
    const imageRef = ref(storage, `images/${checkImage}`);
    getDownloadURL(imageRef)
      .then((url) => {
        setURL(url);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  const updateOrder = async () => {
    confirmAlert({
      message: "Are you sure to update this order?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setIsLoading(true);
            if (checkImage === null) {
              const IName = imageUpload.name + v4();
              if (imageUpload == null) {
                alert("No data");
                return;
              }
              const imageRef = ref(storage, `images/${IName}`);
              uploadBytes(imageRef, imageUpload);
              updateDoc(orderDoc, {
                weight: weight,
                height: height,
                description: description,
                programme: programme,
                goal: goal,
                image: `${IName}`,
              }).then(navigate("/orders"));
            } else {
              updateDoc(orderDoc, {
                weight: weight,
                height: height,
                description: description,
                programme: programme,
                goal: goal,
              }).then(navigate("/orders"));
            }
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No")
        },
      ],
    });
  };

  //Delete image for update
  const deleteImage = async () => {
    confirmAlert({
      message: "Are you sure to remove this image?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const storage = getStorage();
            const imageRef = ref(storage, `images/${checkImage}`);
            // Delete the file
            deleteObject(imageRef)
              .then(
                updateDoc(orderDoc, {
                  image: null,
                })
              )
              .then(setCheckImage(null))
              .catch((error) => {
                // Uh-oh, an error occurred!
              });
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No")
        },
      ],
    });
  };

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
                  id="outlined-multiline-flexible"
                  label="Trainer Name"
                  sx={{ width: "100%" }}
                  value={trainerName}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Email"
                  sx={{ width: "100%" }}
                  value={trainerEmail}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "15px" }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Weight(kg)"
                  sx={{ width: "100%" }}
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Height(cm)"
                  sx={{ width: "100%" }}
                  value={height}
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "15px" }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Goal"
                  sx={{ width: "100%" }}
                  value={goal}
                  // inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setGoal(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Programme"
                  sx={{ width: "100%" }}
                  value={programme}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "15px" }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              sx={{ width: "100%" }}
              multiline
              maxRows={4}
              value={description}
              // inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Box>
          {checkImage !== null ? (
            <Box sx={{ marginTop: "15px" }}>
              <Grid container>
                <Grid item>
                  <CardMedia
                    component="img"
                    height="170px"
                    sx={{ width: "140px", borderRadius: 3 }}
                    image={url}
                    alt="GYM TRAINER"
                  />
                </Grid>
                <Grid item>
                  <Tooltip title="Delete Image">
                    <IconButton sx={{ color: "#2A3036" }} onClick={deleteImage}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{ position: "absolute" }}>
              <Grid container spacing={0.3}>
                <Grid item>
                  <ErrorOutlineIcon
                    sx={{ fontSize: "14px", marginTop: "6px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h7" sx={{ fontSize: "11px" }}>
                    Upload some of your recent images
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                component="label"
                sx={{ border: "1px solid #ccc!important", color: "#2A3036" }}
              >
                <input
                  accept="image/*"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                  multiple
                  type="file"
                />
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ padding: 4, position: "absolute", bottom: 0 }}>
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="contained" sx={{ background: "#2A3036" }}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ background: "#3C56F5" }}
                onClick={() => {
                  updateOrder();
                }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );

  return <>{isLoading ? <LoadingSpinner message={""} /> : renderPage}</>;
}

export default UpdateOrderSubPage;

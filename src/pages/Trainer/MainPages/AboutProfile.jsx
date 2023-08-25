import { Close } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AppBarTrainer from "../../../components/Trainer/AppBarTrainer";
import { db } from "../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { storage } from "./../../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AboutProfile = () => {
  const [selected, setSelected] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [About, setAbout] = useState("");
  const [ImageURL, setImageURL] = useState("");
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

  // update profile
  const updateUser = async (id) => {
    // getting specific user document with user ID
    const userDoc = doc(db, "users", id);
    const imageRef = ref(storage, `TrainerProfile/${selected.name}`);

    if (About === "") {
      ErrMsg("Fill about section!");
    } else if (selected === "") {
      ErrMsg("Image error!");
    } else {
      uploadBytes(imageRef, selected)
        .then(() => {
          getDownloadURL(imageRef).then((url) => {
            updateDoc(userDoc, { picture: url });
          });
        })
        .then();

      const newFields = {
        description: About,
        rate: Math.floor(Math.random() * 6),
        picture: ImageURL,
      };
      await updateDoc(userDoc, newFields).then(navigate("/trainer/orders"));
    }
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    setSelected(selected);
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      console.log("File type is not supported!");
    }
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
                >
                  {!imagePreview && (
                    <>
                      <label htmlFor="fileUpload">Choose Cover</label>
                      <input
                        type="file"
                        id="fileUpload"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </>
                  )}
                </Box>
                {imagePreview && (
                  <>
                    <Close
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setImagePreview(null);
                        setSelected("");
                      }}
                    />
                  </>
                )}
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
                  id="outlined-multiline-static"
                  label="About"
                  multiline
                  rows={7}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <Button
                  sx={{
                    height: "40px",
                    width: "100%",
                    backgroundColor: "#3C56F5",
                    marginTop: "3rem",
                  }}
                  variant="contained"
                  onClick={() => updateUser("5qO5w7dwRvzo3YeCoppe")}
                >
                  save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutProfile;

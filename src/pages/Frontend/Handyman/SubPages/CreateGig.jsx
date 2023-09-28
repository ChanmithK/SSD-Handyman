import {
  Box,
  Button,
  Grid,
  Typography,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { db, storage } from "../../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "500px",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 8,
  py: 4,
  borderRadius: 3,
};

const CreateGig = () => {
  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .matches(/^[\w\.\s]+$/, "Title must contain only words")
      .required("Title is required"),
    description: yup
      .string()
      .matches(/^[\w\.\s]+$/, "Description must contain only words")
      .required("Description is required"),
    price: yup
      .string()
      .matches(/\d+\.?\d*/, "Price must contain only numbers")
      .required("Price is required"),
    completionTime: yup
      .string()
      .matches(/\d+\.?\d*/, "Completion Time must contain only numbers")
      .required("Completion Time is required"),
  });

  const userNew = useSelector((state) => state.setUserData.userData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(null);
  const [ImageURL, setImageURL] = useState("");

  const onSubmitHandler = (data) => {
    if (image === null) {
      ErrMsg("Please select an image for the gig!");

      return;
    }

    createGig(data);
    setImageURL("");
    setImage(null);
  };

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

  const createGig = async (values) => {
    const { title, description, price, completionTime } = values;
    try {
      const imageRef = ref(storage, `gig-images/${image.name + Date.now()}`);

      await uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef).then((url) => {
            setImageURL(url);
          });
        })
        .catch((err) => console.log(err));

      await addDoc(collection(db, "gigs"), {
        title,
        description,
        price,
        taskTime: completionTime + " Days",
        image: ImageURL,
        id: userNew ? userNew[0].id : "",
        name: userNew ? userNew[0].name : "",
        profileImage: userNew != undefined ? userNew[0]?.profileImage : "",
        level: "Level " + Math.ceil(Math.random() * 5),
        rating: Math.floor(Math.random() * 5),
        numReviews: Math.floor(Math.random() * 500),
      });
      handleClose();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Button
        variant="contained"
        sx={{
          color: "#ffffff",
          backgroundColor: "#062b56",
          fontSize: "15px",
          letterSpacing: "1.5px",
          fontFamily: "Inter",
          minWidth: "200px",
          height: "40px",
          borderRadius: "5px",
          textTransform: "none",
          fontWeight: "600",
          mt: 2,
        }}
        onClick={handleOpen}
      >
        CREATE GIG
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: "26px",
                    color: "#f96f27",
                    fontWeight: "800",
                    fontFamily: "Inter",
                  }}
                >
                  Craft Your Success
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#062b56",
                    fontWeight: "600",
                    fontFamily: "Inter",
                  }}
                >
                  Your Skills, Your Gigs, Your Way of Building your Career!
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="title"
                  label="Brief Title of the Services"
                  variant="outlined"
                  fullWidth
                  {...register("title")}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Description of the Offered Services"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={5}
                  rows={5}
                  {...register("description")}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="price"
                  label="Price (Rs.)"
                  variant="outlined"
                  fullWidth
                  {...register("price")}
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="estimatedTime"
                  label="Estimated Time of Completion (Days)"
                  variant="outlined"
                  fullWidth
                  {...register("completionTime")}
                  error={Boolean(errors.completionTime)}
                  helperText={errors.completionTime?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      backgroundColor: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "14px",
                      fontFamily: "Inter",
                      color: "#ffffff",
                    }}
                  >
                    Select Image for the Gig
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      style={{
                        display: "none",
                      }}
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </Button>
                </label>
              </Grid>
              <Grid item xs={2}>
                <Tooltip
                  placement="top"
                  title={
                    <img
                      src={image ? URL.createObjectURL(image) : ""}
                      alt="image"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  }
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#062b56",
                      fontWeight: "600",
                      fontFamily: "Inter",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      width: "250px",
                    }}
                  >
                    {image && image.name}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                  position: "absolute",
                  bottom: "4%",
                  left: "58.5%",
                }}
              >
                <Box>
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "12px",
                      mr: 2,
                    }}
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#ffffff",
                      backgroundColor: "#062b56",
                      fontSize: "12px",
                      fontFamily: "Inter",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Create Gig
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateGig;

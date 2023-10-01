import {
  Box,
  Button,
  Grid,
  Typography,
  Modal,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

const CreateCustomerRequest = () => {
  const validationSchema = yup.object().shape({
    request: yup.string().required("Please enter your request"),
    budget: yup
      .string()
      .required("Please enter the budget")
      .matches(/^[0-9]+$/, "Must be only digits"),
    duration: yup
      .string()
      .required("Please enter the duration")
      .matches(/^[0-9]+$/, "Must be only digits"),
    category: yup.string().required("Please select a category"),
    requiredDate: yup
      .string()
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        "Date must be in dd/mm/yyyy format"
      )
      .required("Date is required"),
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
    handleClose();
    confirmAlert({
      message: "Are you sure to create this request ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            createGig(data);
          },
        },
        { label: "No" },
      ],
    });
    setImageURL("");
    setImage(null);
  };

  const createGig = async (values) => {
    const { request, budget, duration, category, requiredDate } = values;
    try {
      await addDoc(collection(db, "buyerRequests"), {
        request,
        budget,
        duration,
        category,
        date: requiredDate,
        customerId: userNew.id,
        buyer: userNew.name,
      });
      handleClose();
      reset();
    } catch (error) {
      console.log("Error adding document");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        mb: 2,
        // mx: 2,
      }}
    >
      <ToastContainer />
      <Button
        variant="contained"
        sx={{
          color: "#ffffff",
          backgroundColor: "#062b56",
          fontSize: "12px",
          fontFamily: "Inter",
          minWidth: "150px",
          height: "40px",
          borderRadius: "5px",
          textTransform: "none",
          fontWeight: "600",
          mt: 2,
        }}
        onClick={handleOpen}
      >
        CREATE BUYER REQUEST
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
                  Are You Tired of Looking for a Handyman?
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#062b56",
                    fontWeight: "600",
                    fontFamily: "Inter",
                  }}
                >
                  Find the Best Suit to Do Your Handy Work for You
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="request"
                  label="Description of the Requesting Services"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={5}
                  rows={5}
                  {...register("request")}
                  error={Boolean(errors.request)}
                  helperText={errors.request?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="budget"
                  label="Budget (Rs.)"
                  variant="outlined"
                  fullWidth
                  {...register("budget")}
                  error={Boolean(errors.budget)}
                  helperText={errors.budget?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="duration"
                  label="Duration (Days)"
                  variant="outlined"
                  fullWidth
                  {...register("duration")}
                  error={Boolean(errors.duration)}
                  helperText={errors.duration?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} fullWidth>
                <FormControl fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    label="Category"
                    name="category"
                    {...register("category")}
                    autoFocus
                    error={Boolean(errors.category)}
                  >
                    <MenuItem value={"Plumber"}>Plumber</MenuItem>
                    <MenuItem value={"Mason"}>Mason</MenuItem>
                    <MenuItem value={"Electrician"}>Electrician</MenuItem>
                    <MenuItem value={"Carpenter"}>Carpenter</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="requiredDate"
                  label="Required Date (dd/mm/yyyy)"
                  variant="outlined"
                  fullWidth
                  {...register("requiredDate")}
                  error={errors.requiredDate ? true : false}
                  helperText={errors.requiredDate?.message}
                />
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
                  left: "48.5%",
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
                    Create Buyer Request
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

export default CreateCustomerRequest;

import * as React from "react";
import { Box, Button, Grid, Modal, Typography, TextField } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { db, storage } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function SendRequestModel({ open, setOpen, gigData }) {
  const userNew = useSelector((state) => state.setUserData.userData);

  const validationSchema = yup.object().shape({
    description: yup
      .string()
      .matches(/^[\w\.\s]+$/, "Description must contain only words")
      .required("Description is required"),
    requiredDate: yup
      .string()
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        "Date must be in dd/mm/yyyy format"
      )
      .required("Date is required"),
    city: yup
      .string()
      .matches(/^[\w\.\s]+$/, "City must contain only words")
      .required("City is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = async (data) => {
    sendRequest(data);
  };

  const sendRequest = async (data) => {
    const { description, requiredDate, city } = data;

    try {
      await addDoc(collection(db, "orders"), {
        description,
        requiredDate,
        city,
        gigId: gigData?.id,
        gigTitle: gigData?.title,
        cusID: userNew?.id,
        cusName: userNew?.name,
        handymanID: gigData?.userId,
        handymanName: gigData?.name,
        status: 2,
        note: "",
      });
      setOpen(false);
      reset();
    } catch (error) {
      console.log("Error adding document");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position={"relative"}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: "19px",
                    color: "#f96a20",
                    fontWeight: "550",
                  }}
                >
                  Hire the Best Handymen to Fix Your Home
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Description about the Work"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={5}
                  rows={5}
                  {...register("description")}
                  error={errors.description ? true : false}
                  helperText={errors.description?.message}
                />
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
              <Grid item xs={12}>
                <TextField
                  id="city"
                  label="City"
                  variant="outlined"
                  fullWidth
                  {...register("city")}
                  error={errors.city ? true : false}
                  helperText={errors.city?.message}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                position: "absolute",
                bottom: 30,
                right: "3.5%",
              }}
            >
              <Button
                sx={{
                  minWidth: 110,
                  color: "#062b56",
                  borderColor: "#062b56",
                  fontSize: "12px",
                  mr: 2,
                }}
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  minWidth: 110,
                  color: "#fff",
                  backgroundColor: "#062b56",
                  fontSize: "12px",
                }}
                variant="contained"
                type="submit"
              >
                Send Request
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

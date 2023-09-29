import React, { useState, useEffect } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Close } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { doc, updateDoc } from "@firebase/firestore";
import { db, storage } from "../../../../firebase-config";
import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const EditProfile = () => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name must contain only letters"),
    city: yup
      .string()
      .required("City is required")
      .matches(/^[a-zA-Z\s]*$/, "City must contain only letters"),
    telephone: yup
      .string()
      .required("Mobile is required")
      .matches(/^\d+$/, "Mobile must contain only digits")
      .min(10, "Mobile must be 10 digits")
      .max(10, "Mobile must be 10 digits"),
    age: yup
      .string()
      .required("Age is required")
      .matches(/^(1[89]|[2-9][0-9]|100)$/, "Age must be between 18 and 100"),
  });

  const navigate = useNavigate();
  const userNew = useSelector((state) => state.setUserData.userData);
  const [selected, setSelected] = useState(userNew?.profileImage);
  const [imagePreview, setImagePreview] = useState(userNew?.profileImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: userNew?.name,
      telephone: userNew?.mobile,
      age: userNew?.age,
      city: userNew?.city,
    },
  });

  const onSubmitHandler = (data) => {
    updateUser(data);
  };

  const updateUser = async (data) => {
    console.log(selected);
    const { name, telephone, age, city } = data;

    try {
      if (selected) {
        const imageRef = ref(
          storage,
          `user-images/${selected.name + Date.now()}`
        );
        await uploadBytes(imageRef, selected)
          .then(async () => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, "users", userNew?.id), {
              name: name,
              mobile: telephone,
              age: age,
              city: city,
              profileImage: downloadURL ? downloadURL : userNew?.profileImage,
            });
          })
          .catch((err) => console.log(err));
      }

      navigate("/");
    } catch (error) {
      console.log(error);
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
            <Tooltip title="Click to Upload a New Image" followCursor>
              <label htmlFor="fileUpload">
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "4.5rem",
                    marginLeft: "6.3rem",
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

                      background: imagePreview
                        ? `url("${imagePreview}")no-repeat center/cover`
                        : "#D9D9D9",
                    }}
                  >
                    {!imagePreview && (
                      <>
                        <Box
                          sx={{
                            backgroundColor: "TRANSPARENT",
                            color: "#fff",
                            borderRadius: "50%",
                            cursor: "pointer",
                            height: "300px",
                            width: "300px",
                          }}
                        ></Box>

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
                        sx={{ cursor: "pointer", textAlign: "right" }}
                        onClick={() => {
                          setImagePreview(null);
                          setSelected("");
                        }}
                      />
                    </>
                  )}
                </Grid>
              </label>
            </Tooltip>
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
                <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        id="Age"
                        label="Age"
                        {...register("age")}
                        error={!!errors.age}
                        helperText={errors?.age?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="telephone"
                        label="Telephone"
                        {...register("telephone")}
                        error={!!errors.telephone}
                        helperText={errors?.telephone?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="city"
                        label="City"
                        {...register("city")}
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                        InputLabelProps={{ shrink: true }}
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
                  >
                    SAVE CHANGES
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditProfile;

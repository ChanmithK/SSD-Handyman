import { Box, Button, CardMedia, Grid, TextField } from "@mui/material";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ViewOrderSubPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state.orderId;
  const trainerName = location.state.trainerName;
  const trainerEmail = location.state.email;
  const [data, setData] = useState("");
  const [url, setURL] = useState("");

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "orders", orderId);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();
  }, []);

  const storage = getStorage();
  const imageRef = ref(storage, `images/${data.image}`);
  getDownloadURL(imageRef)
    .then((url) => {
      setURL(url);
    })
    .catch((error) => {
      console.log("error", error);
    });

  //Delete the order if not proceeded
  const deleteOrder = async (id) => {
    confirmAlert({
      message: "Are you sure to delete this order ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const userDoc = doc(db, "orders", id);
            deleteDoc(userDoc);

            const storage = getStorage();
            const imageRef = ref(storage, `images/${data.image}`);
            // Delete the file
            deleteObject(imageRef).catch((error) => {
              // Uh-oh, an error occurred!
            });
            navigate("/orders");
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No")
        },
      ],
    });
  };

  return (
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
                  value={data.weight}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Height(cm)"
                  sx={{ width: "100%" }}
                  value={data.height}
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
                  label="Goal"
                  sx={{ width: "100%" }}
                  value={data.goal}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Programme"
                  sx={{ width: "100%" }}
                  value={data.programme}
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
              rows={3}
              value={data.description}
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ marginTop: "15px" }}>
            <CardMedia
              component="img"
              height="170px"
              sx={{ width: "140px", borderRadius: 3 }}
              image={url}
              alt="GYM TRAINER"
            />
          </Box>
        </Box>
        {data.status === "proceed" ? null : (
          <Box sx={{ padding: 4, position: "absolute", bottom: 0 }}>
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ background: "#2A3036" }}
                  onClick={() => {
                    deleteOrder(orderId);
                  }}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ background: "#3C56F5" }}
                  onClick={() => {
                    navigate("/update-order", {
                      state: {
                        orderId: orderId,
                        trainerName: trainerName,
                        email: trainerEmail,
                      },
                    });
                  }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ViewOrderSubPage;

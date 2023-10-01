import { Modal, Box, Grid, Typography, TextField, Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase-config";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function ViewOrderDirectRequestModal({
  open,
  setOpenModal,
  requestData,
}) {
  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState("");
  const handleOpenNote = () => {
    setOpenNote(true);
  };
  const handleCloseNote = () => {
    setOpenNote(false);
  };

  const acceptOrder = async () => {
    // getting specific user document with user ID
    const addNote = doc(db, "orders", requestData?.id);
    const newFields = {
      note: note,
      status: 1,
    };
    await updateDoc(addNote, newFields);
    // await updateDoc(packageDoc, newFields).then(
    //   navigate("/trainer/packages")
    // );
  };

  const rejectOrder = async () => {
    // getting specific user document with user ID
    const addNote = doc(db, "orders", requestData?.id);
    const newFields = {
      note: note,
      status: 0,
    };
    await updateDoc(addNote, newFields);
    // await updateDoc(packageDoc, newFields).then(
    //   navigate("/trainer/packages")
    // );
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position={"relative"}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontSize: "19px",
                  color: "#f96a20",
                  fontWeight: "550",
                }}
              >
                Order Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Gig Title"
                variant="outlined"
                fullWidth
                defaultValue={requestData?.gigTitle}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="City"
                variant="outlined"
                fullWidth
                defaultValue={requestData?.city}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Required Date"
                variant="outlined"
                fullWidth
                defaultValue={requestData?.requiredDate}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Note"
              variant="outlined"
              fullWidth
              multiline
              maxRows={5}
              rows={5}
              defaultValue={requestData?.note}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid> */}
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                maxRows={5}
                rows={5}
                defaultValue={requestData?.description}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {requestData?.note ? (
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  label="Your Note"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={5}
                  rows={5}
                  defaultValue={requestData?.note}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <>
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  {requestData?.status === 1 || requestData?.status === 0 ? (
                    ""
                  ) : (
                    <Button
                      sx={{
                        minWidth: 110,
                        color: "white",
                        backgroundColor: "#062b56",
                        fontSize: "12px",
                      }}
                      variant="contained"
                      onClick={() => {
                        handleOpenNote();
                      }}
                    >
                      Continue
                    </Button>
                  )}
                </>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openNote}
        onClose={handleCloseNote}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <TextField
            id="filled-basic"
            label="Note"
            variant="outlined"
            fullWidth
            multiline
            maxRows={5}
            rows={5}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 1,
              mt: 2,
            }}
          >
            <>
              <Button
                sx={{
                  minWidth: 110,
                  color: "#062b56",
                  borderColor: "#062b56",
                  fontSize: "12px",
                }}
                variant="outlined"
                onClick={() => {
                  setOpenModal(false);
                  handleCloseNote();
                  confirmAlert({
                    message: "Are you sure to reject this request ?",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: () => {
                          rejectOrder().then(handleCloseNote());
                        },
                      },
                      { label: "No" },
                    ],
                  });
                }}
              >
                Reject
              </Button>
              <Button
                sx={{
                  minWidth: 110,
                  color: "white",
                  backgroundColor: "#062b56",
                  fontSize: "12px",
                }}
                variant="contained"
                onClick={() => {
                  setOpenModal(false);
                  confirmAlert({
                    message: "Are you sure to accept this request ?",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: () => {
                          acceptOrder().then(handleCloseNote());
                        },
                      },
                      { label: "No" },
                    ],
                  });
                }}
              >
                Accept
              </Button>
            </>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

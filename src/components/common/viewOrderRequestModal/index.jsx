import { Modal, Box, Grid, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

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

export default function ViewOrderRequestModal({
  open,
  setOpenModal,
  requestData,
}) {
  const userRole = useSelector((state) => state.setUserData.userData.role);
  return (
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
          {userRole === "Handyman" && (
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Customer Name"
                variant="outlined"
                fullWidth
                defaultValue={requestData?.buyer}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Budget"
              variant="outlined"
              fullWidth
              defaultValue={requestData?.budget}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Category"
              variant="outlined"
              fullWidth
              defaultValue={requestData?.category}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Date"
              variant="outlined"
              fullWidth
              defaultValue={requestData?.date}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Duration"
              variant="outlined"
              fullWidth
              defaultValue={requestData?.duration}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Request"
              variant="outlined"
              fullWidth
              multiline
              maxRows={5}
              rows={5}
              defaultValue={requestData?.request}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              {userRole === "Customer" ? (
                <Button
                  sx={{
                    minWidth: 110,
                    color: "#062b56",
                    borderColor: "#062b56",
                    fontSize: "12px",
                  }}
                  variant="outlined"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
              ) : (
                <>
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={() => {}}
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={() => {}}
                  >
                    Reject
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

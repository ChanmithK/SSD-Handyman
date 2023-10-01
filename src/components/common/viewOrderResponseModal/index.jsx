import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React from "react";

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

export default function ViewOrderResponseModal({
  open,
  setOpenModal,
  requestData,
}) {
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
              label="Handyman Name"
              variant="outlined"
              fullWidth
              defaultValue={requestData?.handymanName}
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
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Status"
              variant="outlined"
              fullWidth
              defaultValue={
                (requestData?.status == 2 && "Pending") ||
                (requestData?.status == 0 && "Rejected") ||
                (requestData?.status == 1 && "Approved")
              }
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {requestData?.note && (
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
          )}
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

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Gigs } from "../../../pages/Data/GidData";
import { Grid, TextField } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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

export default function ViewGigModal({ openModal, setOpenModal, gigData }) {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position={"relative"}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      height: "42px",
                      width: "42px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    <img
                      src={gigData?.profileImage}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#222325",
                      }}
                    >
                      {gigData?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#222325",
                      }}
                    >
                      {gigData?.level}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #062b56",
                    borderRadius: "5px",
                    padding: "3px 10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#f96a20",
                    }}
                  >
                    From Rs.{gigData?.price}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={gigData?.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    padding: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StarIcon
                    sx={{
                      fontSize: 19,
                      color: "#222325",
                      mt: -0.3,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#222325",
                      display: "flex",
                      alignItems: "center",
                      ml: 0.4,
                    }}
                  >
                    {gigData?.rating}
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#74767e",
                        display: "flex",
                        ml: 0.5,
                      }}
                    >
                      ({gigData?.numReviews})
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                sx={{
                  fontSize: "17px",
                  color: "#404145",
                  fontWeight: "550",
                  mb: 1.5,
                }}
              >
                {gigData?.title}
              </Typography>
              <TextField
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#222325",
                }}
                defaultValue={gigData?.description}
                multiline
                rows={5}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  justifyContent: "flex-end",
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
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    minWidth: 110,
                    color: "#ffffff",
                    borderColor: "#062b56",
                    fontSize: "12px",
                    backgroundColor: "#062b56",
                    "&:hover": {
                      backgroundColor: "#0a3e7c",
                    },
                  }}
                  variant="contained"
                  // onClick={}
                >
                  Send Request
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

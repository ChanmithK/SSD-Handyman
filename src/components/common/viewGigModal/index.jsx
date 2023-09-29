import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Gigs } from "../../../pages/Data/GidData";
import { Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SendRequestModel from "../sendRequestModal";

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

export default function ViewGigModal({ openModal, setOpenModal, gigData }) {
  const [open, setOpen] = React.useState(false);
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
              <Typography
                sx={{
                  fontSize: "17px",
                  color: "#404145",
                  fontWeight: "550",
                }}
              >
                {gigData?.title}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                component="img"
                src={gigData?.image}
                alt=""
                style={{
                  width: "320px",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#222325",
                }}
              >
                {gigData?.description}
              </Typography>
            </Grid>
            <Grid item xs={6}>
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
                      height: "29px",
                      width: "29px",
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
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#222325",
                    }}
                  >
                    {Gigs[0].name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#404145",
                    }}
                  >
                    {gigData?.level}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#222325",
                  }}
                >
                  From Rs.{gigData?.price}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <StarIcon
                    sx={{
                      fontSize: 19,
                      color: "#222325",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#222325",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {gigData?.rating}
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#74767e",
                        display: "flex",
                      }}
                    >
                      ({gigData?.numReviews})
                    </Typography>
                  </Typography>
                </Box>
              </Box>
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
                color: "#ffffff",
                borderColor: "#062b56",
                fontSize: "12px",
                backgroundColor: "#062b56",
                "&:hover": {
                  backgroundColor: "#0a3e7c",
                },
              }}
              variant="contained"
              onClick={() => {
                setOpen(true);
                setOpenModal(false);
              }}
            >
              Send a Request
            </Button>
          </Box>
        </Box>
      </Modal>
      <SendRequestModel open={open} setOpen={setOpen} gigData={gigData} />
    </div>
  );
}

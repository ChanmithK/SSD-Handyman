import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../../firebase-config";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

function HandymanResponses() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [handymanOrderResponse, setHandymanOrderResponse] = useState([]);
  const userNew = useSelector((state) => state.setUserData.userData);

  useEffect(() => {
    const getHandymanOrderResponse = async () => {
      const filterdData = query(
        collection(db, "orders"),
        where("cusID", "==", `${userNew?.id}`)
      );
      const querySnapshot = await getDocs(filterdData);
      let offeredRequests = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setHandymanOrderResponse(offeredRequests);
    };
    getHandymanOrderResponse();
  }, [userNew]);

  console.log("handyman orders", handymanOrderResponse);

  return (
    <Box
      sx={{
        mt: 0,
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                  minWidth: "140px",
                }}
              >
                GIG TITLE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                  minWidth: "140px",
                }}
                align="left"
              >
                HANDYMAN NAME
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                DESCRIPTION
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                REQUIRED DATE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                STATUS
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                NOTE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="center"
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {handymanOrderResponse?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.gigTitle}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="let"
                >
                  {/* {row.buyer} */}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.description}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.requiredDate}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.status === 1 ? (
                    <Tooltip title="Approved">
                      <img
                        src={"https://img.icons8.com/color/48/ok--v1.png"}
                        alt=""
                        style={{
                          width: "44%",
                          height: "44%",
                          // objectFit: "cover",
                        }}
                      />
                    </Tooltip>
                  ) : row.status === 0 ? (
                    <Tooltip title="Rejected">
                      <img
                        src={
                          "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/FA5252/external-rejected-approved-and-rejected-tanah-basah-glyph-tanah-basah-16.png"
                        }
                        alt=""
                        style={{
                          width: "41%",
                          height: "41%",
                          // objectFit: "cover",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Pending">
                      <img
                        src={
                          "https://img.icons8.com/ios-filled/50/FAB005/clock--v1.png"
                        }
                        alt=""
                        style={{
                          width: "41%",
                          height: "41%",
                          // objectFit: "cover",
                        }}
                      />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="let"
                >
                  {row.note}
                </TableCell>
                <TableCell align="right">
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#f96a20",
                      borderColor: "#f96a20",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={handleOpen}
                  >
                    View Gig
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
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
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                maxRows={5}
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Duration"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Offer"
                variant="outlined"
                fullWidth
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
              onClick={handleClose}
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
              onClick={handleOpen}
              startIcon={<PhoneIcon />}
            >
              Contact Customer
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default HandymanResponses;

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
  Typography,
} from "@mui/material";
import { collection,
  doc,
  getDoc,
  getDocs,
  query,
  where, } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../../firebase-config";
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

function BuyerRequests() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buyerRequests, setBuyerRequests] = useState([]);

  const [requsetData, setRequsetData] = useState({});
  const userNew = useSelector((state) => state.setUserData.userData);

  useEffect(() => {
    const getBuyerRequests = async () => {
      const filterdData = query(
        collection(db, "buyerRequests"),
        where("customerID", "==", `${userNew?.id}`)
      );
      const querySnapshot = await getDocs(filterdData);
      let offeredRequests = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBuyerRequests(offeredRequests);
    };
    getBuyerRequests();
  }, [userNew]);

  console.log("buyer Request",buyerRequests);

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
                DATE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                CATEGORY
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                REQUEST
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                DURATION
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                BUDGET
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
            {buyerRequests?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="let"
                >
                  {row.category}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.request}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.duration}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  Rs.{row.budget}
                </TableCell>
                <TableCell align="right">
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={handleOpen}
                  >
                    View Details
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
                  fontSize: "17px",
                  color: "#f96a20",
                  fontWeight: "550",
                }}
              >
                Craft an Impressive Offer to Secure This Job...
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
            >
              Send Offer
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BuyerRequests;

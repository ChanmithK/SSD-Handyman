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
import React, { useEffect, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase-config";
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

function SentOffers() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buyerRequests, setBuyerRequests] = useState([]);
  const [requsetData, setRequsetData] = useState({});
  const userNew = useSelector((state) => state.setUserData.userData);

  useEffect(() => {
    const getBuyerRequests = async () => {
      const filterdData = query(
        collection(db, "buyerRequestsSent"),
        where("handyManId", "==", `${userNew?.id}`)
      );
      const querySnapshot = await getDocs(filterdData);
      let offeredRequests = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBuyerRequests(offeredRequests);
    };
    getBuyerRequests();
  }, []);

  //   const rows = [
  //     {
  //       date: "2023-09-28",
  //       category: "Plumbing",
  //       buyer: "John Doe",
  //       request:
  //         "I have a leaky faucet in my kitchen that needs immediate repair. The faucet has been leaking for a week now, and it's causing water damage to the sink area. Please provide an estimate for fixing it.",
  //       status: 0,
  //       budget: "$50",
  //     },
  //     {
  //       date: "2023-09-27",
  //       category: "Painting",
  //       buyer: "Jane Smith",
  //       request:
  //         "I'm looking to repaint the walls of my living room. The room is approximately 300 square feet, and I'd like to use a light beige color. Please provide a quote for the job, including paint and labor costs.",
  //       status: 1,
  //       budget: "$200",
  //     },
  //     {
  //       date: "2023-09-24",
  //       category: "Landscaping",
  //       buyer: "Eve Wilson",
  //       request:
  //         "I'm interested in landscaping and gardening services for my backyard. The area is approximately 500 square feet, and I'd like to have a mix of flowers and shrubs planted. Please provide an estimate for the project.",
  //       status: 2,
  //       budget: "$500",
  //     },
  //   ];

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
                  minWidth: "140px",
                }}
                align="left"
              >
                BUYER
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
                BUDGET
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
                align="center"
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buyerRequests.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.brDate}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="let"
                >
                  {row.brBuyer}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="let"
                >
                  {row.brCategory}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.brRequest}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.brBudget}
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

                <TableCell align="right">
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#f96a20",
                      borderColor: "#f96a20",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={() => {
                      const getBlogs = async () => {
                        const data = doc(db, "buyerRequestsSent", row.id);
                        const docSnap = await getDoc(data);
                        setRequsetData(docSnap.data());
                      };

                      getBlogs().then(handleOpen);
                    }}
                  >
                    View Offer
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
                value={requsetData?.description}
                aria-readonlyInputProps={{
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
                value={requsetData?.duration}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Offer"
                variant="outlined"
                fullWidth
                value={requsetData?.offer}
                InputProps={{
                  readOnly: true,
                }}
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

export default SentOffers;

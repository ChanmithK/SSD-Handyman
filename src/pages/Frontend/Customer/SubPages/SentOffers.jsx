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
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../../firebase-config";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

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
  maxHeight: "95vh",
  overflowY: "scroll",
};

function SentOffers() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState("");

  const [buyerResponses, setBuyerResponses] = useState([]);
  const [requsetData, setRequsetData] = useState({});
  const userNew = useSelector((state) => state.setUserData.userData);

  const handleOpenNote = () => {
    setOpenNote(true);
  };
  const handleCloseNote = () => {
    setOpenNote(false);
  };

  const acceptOrder = async () => {
    const addNote = doc(db, "buyerRequestsSent", requsetData?.id);
    const newFields = {
      note: note,
      status: 1,
    };
    await updateDoc(addNote, newFields);
  };

  const rejectOrder = async () => {
    const addNote = doc(db, "buyerRequestsSent", requsetData?.id);
    const newFields = {
      note: note,
      status: 0,
    };
    await updateDoc(addNote, newFields);
  };

  useEffect(() => {
    const getBuyerResponses = async () => {
      const filterdData = query(
        collection(db, "buyerRequestsSent"),
        where("customerId", "==", `${userNew?.id}`)
      );
      const querySnapshot = await getDocs(filterdData);

      onSnapshot(filterdData, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBuyerResponses(data);
      });

      // let offeredRequests = querySnapshot.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));
      // setBuyerResponses(offeredRequests);
    };
    getBuyerResponses();
  }, [userNew]);

  console.log("buyer response", buyerResponses);

  return (
    <Box
      sx={{
        mt: 0,
      }}
    >
      <TableContainer component={Paper} sx={{ maxHeight: "86vh" }}>
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
                RESPONSE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                OFFER
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
            {buyerResponses?.map((row) => (
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
                  {row.brCategory}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="let"
                >
                  {row.brRequest.slice(0, 20)}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.handyManId}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.description.slice(0, 20)}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.offer}
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
                      setRequsetData(row);
                      handleOpen();
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
                label="Category"
                variant="outlined"
                defaultValue={requsetData?.brCategory}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Handyman Name"
                variant="outlined"
                defaultValue={requsetData?.handyManId}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Offer"
                variant="outlined"
                defaultValue={requsetData?.offer}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Duration"
                variant="outlined"
                defaultValue={requsetData?.duration}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Status"
                variant="outlined"
                defaultValue={
                  (requsetData?.status === 1 && "Approved") ||
                  (requsetData?.status === 0 && "Rejected") ||
                  (requsetData?.status === 2 && "Pending")
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Date"
                variant="outlined"
                defaultValue={requsetData?.brDate}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Response"
                variant="outlined"
                defaultValue={requsetData?.description}
                fullWidth
                multiline
                maxRows={5}
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                label="Description"
                variant="outlined"
                defaultValue={requsetData?.brRequest}
                fullWidth
                multiline
                maxRows={5}
                rows={5}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
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
            {requsetData?.status === 1 || requsetData?.status === 0 ? (
              ""
            ) : (
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
                  handleOpenNote();
                }}
              >
                Continue
              </Button>
            )}
          </Box>
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
                  handleClose(false);
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
                  handleClose(false);
                  handleCloseNote();
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

export default SentOffers;

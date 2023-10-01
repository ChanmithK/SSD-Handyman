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
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase-config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import * as yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "66%",
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
  const userNew = useSelector((state) => state.setUserData.userData);

  const rows = [
    {
      date: "2023-09-28",
      category: "Plumbing",
      buyer: "John Doe",
      request:
        "I have a leaky faucet in my kitchen that needs immediate repair. The faucet has been leaking for a week now, and it's causing water damage to the sink area. Please provide an estimate for fixing it.",
      duration: "2 hours",
      budget: "$50",
    },
    {
      date: "2023-09-27",
      category: "Painting",
      buyer: "Jane Smith",
      request:
        "I'm looking to repaint the walls of my living room. The room is approximately 300 square feet, and I'd like to use a light beige color. Please provide a quote for the job, including paint and labor costs.",
      duration: "1 day",
      budget: "$200",
    },
    {
      date: "2023-09-26",
      category: "Electrical",
      buyer: "Bob Johnson",
      request:
        "I need assistance with installing a ceiling fan in my bedroom. The room already has a junction box, and I have purchased the ceiling fan. Please let me know your availability and cost for installation.",
      duration: "3 hours",
      budget: "$75",
    },
    {
      date: "2023-09-25",
      category: "Locksmith",
      buyer: "Alice Brown",
      request:
        "My front door has a broken lock mechanism, and I'm having trouble opening and closing it. I need a handyman to repair the lock and ensure the door operates smoothly. Please provide a cost estimate.",
      duration: "4 hours",
      budget: "$100",
    },
    {
      date: "2023-09-24",
      category: "Landscaping",
      buyer: "Eve Wilson",
      request:
        "I'm interested in landscaping and gardening services for my backyard. The area is approximately 500 square feet, and I'd like to have a mix of flowers and shrubs planted. Please provide an estimate for the project.",
      duration: "1 week",
      budget: "$500",
    },
  ];

  const validationSchema = yup.object().shape({
    description: yup
      .string()
      .matches(/^[\w\.\s]+$/, "Description must contain only words")
      .required("Description is required"),
    duration: yup
      .string()
      .matches(/\d+\.?\d*/, "Duration must contain only numbers")
      .required("Completion Time is required"),
    offer: yup
      .string()
      .matches(/\d+\.?\d*/, "Price must contain only numbers")
      .required("Price is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = async (data) => {
    sendBuyerRequest(data);
    reset();
    handleClose();
  };

  const sendBuyerRequest = async (data) => {
    const buyerRequestsCollectionRef = collection(db, "buyerRequestsSent");

    const { description, duration, offer } = data;

    try {
      await addDoc(buyerRequestsCollectionRef, {
        description,
        duration,
        offer,
        handyManId: userNew ? userNew.id : null,
        buyerRequestsId: buyerRequests[0].id,
        status: "2",
        brDuration: buyerRequests[0].duration,
        brBudget: parseInt(buyerRequests[0].budget),
        brCategory: buyerRequests[0].category,
        brBuyer: buyerRequests[0].buyer,
        brDate: buyerRequests[0].date,
        brRequest: buyerRequests[0].request,
      });
    } catch (error) {
      console.log("Error adding document");
    }
  };

  useEffect(() => {
    const buyerRequestsCollectionRef = collection(db, "buyerRequests");
    const getBuyerRequests = async () => {
      const data = await getDocs(buyerRequestsCollectionRef);

      const buyerRequestsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (userNew?.id) {
        for (const buyerRequest of buyerRequestsData) {
          const buyerRequestsSentQuery = query(
            collection(db, "buyerRequestsSent"),
            where("handyManId", "!=", userNew.id),
            where("buyerRequestId", "!=", buyerRequest.id)
          );

          const buyerRequestsSentSnapshot = await getDocs(
            buyerRequestsSentQuery
          );
          if (buyerRequestsSentSnapshot.size > 0) {
            buyerRequest.isSendOfferDisabled = true;
          }
        }
      }

      setBuyerRequests(buyerRequestsData);
    };
    getBuyerRequests();
  }, [userNew?.id]);

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
                  {row.buyer}
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
                  {row.request.slice(0, 20)}
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
                    disabled={row.isSendOfferDisabled}
                    sx={{
                      minWidth: 110,
                      color: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={handleOpen}
                  >
                    Send Offer
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
          <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                  id="description"
                  label="Description of the Offered Services"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={5}
                  rows={5}
                  {...register("description")}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="duration"
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  {...register("duration")}
                  error={Boolean(errors.duration)}
                  helperText={errors.duration?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="offer"
                  label="Offer"
                  variant="outlined"
                  fullWidth
                  {...register("offer")}
                  error={Boolean(errors.offer)}
                  helperText={errors.offer?.message}
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
                type="submit"
              >
                Send Offer
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default BuyerRequests;

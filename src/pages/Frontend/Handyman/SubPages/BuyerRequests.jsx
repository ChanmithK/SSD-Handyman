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
import React, { useState } from "react";

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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

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
            {rows.map((row) => (
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
                  {row.budget}
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
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontSize: "17px",
                  color: "#404145",
                  fontWeight: "450",
                }}
              >
                Craft an Impressive Offer Offer to Secure This Job...
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
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Box>
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
                  }}
                  variant="contained"
                  onClick={handleOpen}
                >
                  Send Offer
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

export default BuyerRequests;

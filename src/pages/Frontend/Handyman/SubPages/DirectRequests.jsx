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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../../firebase-config";
import { useSelector } from "react-redux";
import ViewOrderDirectRequestModal from "../../../../components/common/viewOrderDirectRequestModal";

function DirectRequests() {
  const [openModal, setOpenModal] = useState(false);
  const [handymanOrderResponse, setHandymanOrderResponse] = useState([]);
  const userNew = useSelector((state) => state.setUserData.userData);
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    const getHandymanOrderResponse = async () => {
      const filterdData = query(
        collection(db, "orders"),
        where("handymanID", "==", `${userNew?.id}`)
      );
      const querySnapshot = await getDocs(filterdData);

      onSnapshot(filterdData, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setHandymanOrderResponse(data);
      });

      // let offeredRequests = querySnapshot.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));
      // setHandymanOrderResponse(offeredRequests);
    };
    getHandymanOrderResponse();
  }, [userNew]);

  console.log("handyman orders", handymanOrderResponse);

  return (
    <Box sx={{ width: "100%", p: 2, mt: 1 }}>
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
                TITLE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                CUSTOMER
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                CITY
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
                  {row.cusName}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.city}
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
                  {row?.status === 0 ? (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "red",
                        fontWeight: "450",
                      }}
                    >
                      You Rejected
                    </Typography>
                  ) : row?.status === 1 ? (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "green",
                        fontWeight: "450",
                      }}
                    >
                      You Accepted
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#ff8c00",
                        fontWeight: "450",
                      }}
                    >
                      Pending Approval
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setOpenModal(true);
                      setOrderData(row);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ViewOrderDirectRequestModal
        requestData={orderData}
        setOpenModal={setOpenModal}
        open={openModal}
      />
    </Box>
  );
}

export default DirectRequests;

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
import ViewGigModal from "../../../../components/common/viewGigModal";
import CreateGig from "./CreateGig";

function HandymanGigs() {
  const [openModal, setOpenModal] = useState(false);
  const [handymanGigs, setHandymanGigs] = useState([]);

  const [requsetData, setRequsetData] = useState({});
  const userNew = useSelector((state) => state.setUserData.userData);

  useEffect(() => {
    const getHandymanGigs = async () => {
      const filterdData = query(
        collection(db, "gigs"),
        where("userId", "==", `${userNew?.id}`)
      );
      const querySnapshot = await getDocs(filterdData);
      let offeredRequests = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setHandymanGigs(offeredRequests);
    };
    getHandymanGigs();
  }, [userNew]);

  console.log("handyman gigs", handymanGigs);

  return (
    <Box sx={{ width: "100%", p: 2, mt: 1 }}>
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
                PUBLISHED DATE
              </TableCell>
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
                GIG DESCRIPTION
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                GIG IMAGE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                GIG TASK TIME
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  color: "#74767e",
                  fontWeight: "500",
                }}
                align="left"
              >
                GIG PRICE
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
            {handymanGigs?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="let"
                >
                  {row.publishedDate}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
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
                  align="let"
                >
                  <img
                    src={row.image}
                    alt=""
                    style={{
                      width: "150px",
                      height: "90px",
                      borderRadius: "8px",
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row.taskTime}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  Rs.{row.price}
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{
                      minWidth: 110,
                      color: "#f96a20",
                      borderColor: "#f96a20",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setOpenModal(true);
                      setRequsetData(row);
                    }}
                  >
                    View Gig
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateGig />
      <ViewGigModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        gigData={requsetData}
      />
    </Box>
  );
}

export default HandymanGigs;

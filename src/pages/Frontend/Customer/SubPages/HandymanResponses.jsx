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
import ViewOrderResponseModal from "../../../../components/common/viewOrderResponseModal";

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
  const [openModal, setOpenModal] = useState(false);
  const [handymanOrderResponse, setHandymanOrderResponse] = useState([]);
  const userNew = useSelector((state) => state.setUserData.userData);
  const [requsetData, setRequsetData] = useState();

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
                  {row.handymanID}
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
                  {row?.requiredDate}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#404145",
                    fontWeight: "450",
                  }}
                  align="left"
                >
                  {row?.status === 1 ? (
                    <Tooltip title="Approved">
                      <img
                        src={"https://img.icons8.com/color/48/ok--v1.png"}
                        alt=""
                        style={{
                          width: "28%",
                          height: "28%",
                          // objectFit: "cover",
                        }}
                      />
                    </Tooltip>
                  ) : row?.status === 0 ? (
                    <Tooltip title="Rejected">
                      <img
                        src={
                          "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/FA5252/external-rejected-approved-and-rejected-tanah-basah-glyph-tanah-basah-16.png"
                        }
                        alt=""
                        style={{
                          width: "28%",
                          height: "28%",
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
                          width: "28%",
                          height: "28%",
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
                      color: "#062b56",
                      borderColor: "#062b56",
                      fontSize: "12px",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setOpenModal(true);
                      setRequsetData(row);
                    }}
                  >
                    View Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ViewOrderResponseModal
        open={openModal}
        requestData={requsetData}
        setOpenModal={setOpenModal}
      />
    </Box>
  );
}

export default HandymanResponses;

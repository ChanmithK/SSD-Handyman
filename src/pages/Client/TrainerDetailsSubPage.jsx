import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
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
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
const usersCollectionRef = collection(db, "packages");

function createData(name, age, mobile, email) {
  return { name, age, mobile, email };
}

function TrainerDetailsSubPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const trainerId = location.state.id;
  const [packages, setPackages] = useState([]);

  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "users", trainerId);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();

    const getPackages = async () => {
      const filterdData = query(
        usersCollectionRef,
        where("trainerId", "==", `${trainerId}`)
      );
      const querySnapshot = await getDocs(filterdData);
      setPackages(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getPackages();
  }, []);

  const rows = [createData(data.name, data.age, data.mobile, data.email)];

  return (
    <Box
      p={0}
      sx={{
        height: "calc(100vh - 64px)",
        padding: 2,
        marginTop: 8,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 6rem)",
          background: "rgba(255, 255, 255, 0.73)",
          borderRadius: "41px",
          position: "relative",
        }}
      >
        <Box sx={{ padding: 4, position: "relative" }}>
          <Box>
            <TableContainer
              component={Paper}
              sx={{ background: "white", boxShadow: "none", borderRadius: 5 }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell align="right">Mobile</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.age}</TableCell>
                      <TableCell align="right">{row.mobile}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              sx={{ width: "100%" }}
              multiline
              aria-readonly
              rows={3}
              value={data.description}
              inputProps={{ readOnly: true, disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ marginTop: "20px", display: "flex" }}>
            {packages.map((row) => (
              <Card sx={{ minWidth: 275, marginRight: 1 }}>
                <CardContent>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Package Name"
                        size="small"
                        sx={{ width: "100%" }}
                        value={row.name}
                        inputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        sx={{ width: "100%" }}
                        multiline
                        rows={4}
                        value={row.description}
                        size="small"
                        inputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Duration"
                          size="small"
                          sx={{ width: "100%" }}
                          value={row.duration}
                          inputProps={{ readOnly: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Price"
                          size="small"
                          sx={{ width: "100%" }}
                          value={row.price}
                          inputProps={{ readOnly: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{ background: "#3C56F5", marginLeft: 1 }}
                    size="small"
                    onClick={() => {
                      navigate("/make-order", {
                        state: {
                          id: trainerId,
                          name: data.name,
                          mobile: data.mobile,
                          email: data.email,
                          programme: row.name,
                          price: row.price,
                        },
                      });
                    }}
                  >
                    Continue
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TrainerDetailsSubPage;

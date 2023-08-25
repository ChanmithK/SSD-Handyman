import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
const usersCollectionRef = collection(db, "users");

function TrainersSubPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(null);
  const [value, setValue] = useState(4);

  useEffect(() => {
    if (search === null || search === "") {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getUsers();
    }
    searchTrainer();
  }, [search]);

  const searchTrainer = () => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setUsers(filtered);
  };

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
          background: "white",
          borderRadius: "41px",
          paddingLeft: "25px",
          paddingRight: "25px",
        }}
      >
        <Grid container>
          <Grid item xs={12} container justifyContent="flex-end">
            <TextField
              id="outlined-basic"
              size="small"
              sx={{
                width: "400px",
                marginBottom: "10px",
                paddingTop: "20px",
                marginRight: "5px",
              }}
              value={search}
              variant="outlined"
              placeholder="Search Trainer..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: "#3C56F5",
                height: 36.5,
                marginTop: 2.7,
                width: "auto",
              }}
              onClick={() => {
                setSearch("");
              }}
            >
              clear
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                height: "calc(100vh - 11rem)",
                position: "relative",
                background: "rgba(255, 255, 255, 0.73)",
                borderRadius: "20px",
                paddingTop: "4px",
                // padding: 3,
                overflow: "auto",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                },
                "&::-webkit-scrollbar-track": {
                  background: "white",
                  marginTop: "72px",
                  marginBottom: "64px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#2A3036",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              <Box sx={{}}>
                {users.map((user) =>
                  user.role === "Trainer" ? (
                    <Card
                      sx={{
                        maxWidth: "100%",
                        borderRadius: 4,
                        maxHeight: "270px",
                        background: "#F4F3F8",
                        marginBottom: 1,
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onClick={() => {
                        navigate(`/trainer-details`, {
                          state: { id: user.id },
                        });
                      }}
                    >
                      <Grid container>
                        <Grid item xs={2}>
                          <CardMedia
                            component="img"
                            height="320px"
                            width="400px"
                            image={user.picture}
                            alt="GYM TRAINER"
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              sx={{ fontWeight: "bold" }}
                              component="div"
                            >
                              {user.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="black"
                              marginRight="10px"
                            >
                              {user.description}
                            </Typography>
                            <Box
                              sx={{
                                "& > legend": { mt: 2 },
                                position: "absolute",
                                bottom: 9,
                              }}
                            >
                              <Rating
                                name="read-only"
                                value={user.rate}
                                readOnly
                              />
                            </Box>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  ) : null
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TrainersSubPage;

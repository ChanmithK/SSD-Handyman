import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StarIcon from "@mui/icons-material/Star";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../redux/loadingSlice";


function ViewGigs() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Best Selling");
  const [gigs, setGigs] = useState([]);
  const [documentCount, setDocumentCount] = useState(0);
  // const isLoading = useSelector((state) => state.setLoading.loading);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, menuItemText) => {
    setSelectedMenuItem(menuItemText); // Update the selectedMenuItem state
    handleClose();
  };

  useEffect(() => {
    setAnchorEl(document.getElementById("demo-positioned-button"));
  }, []);

  useEffect(() => {
    const gigsCollectionRef = collection(db, "gigs");
    setLoading(true);
    const getGigs = async () => {
      const querySnapshot = await getDocs(gigsCollectionRef);
      const documents = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGigs(documents);
      setDocumentCount(querySnapshot.size); // Set the document count
    };

    getGigs().then(setLoading(false));
  }, [loading]);

  return loading ? (
    <Box>
      <Box
        sx={{
          borderRadius: "15px",
          p: 5,
          height: "100%",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Skeleton width={"95%"} height={60} animation="wave" />
          <Skeleton width={"95%"} height={120} animation="wave" />
          <Skeleton width={"95%"} height={200} animation="wave" />
          <Skeleton width={"95%"} height={300} animation="wave" />
        </Stack>
      </Box>
    </Box>
  ) : (
    <Box>
      <Grid container p={3}>
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#74767e",
              fontWeight: "400",
            }}
          >
            {documentCount} services available
          </Typography>

          <Box
            sx={{
              display: "flex",
              //   alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "19px",
                color: "#74767e",
                fontWeight: "400",
              }}
            >
              Sort by:
            </Typography>

            <IconButton onClick={handleClick} sx={{ mt: -0.65 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#222325",
                }}
              >
                {selectedMenuItem}
              </Typography>
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem
                onClick={(event) => handleMenuItemClick(event, "Recommended")}
              >
                Recommended
              </MenuItem>
              <MenuItem
                onClick={(event) => handleMenuItemClick(event, "Best Selling")}
              >
                Best Selling
              </MenuItem>
              <MenuItem
                onClick={(event) =>
                  handleMenuItemClick(event, "Newest Arrivals")
                }
              >
                Newest Arrivals
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
        <Grid item container spacing={4.5}>
          {/* Single card */}
          {gigs?.map((gig, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  width: "100%",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    setOpenModal(true);
                    setGigData(gig);
                  }}
                >
                  <CardMedia
                    sx={{ height: 205, borderRadius: 2 }}
                    image={gig.image}
                    title=""
                  />
                  <CardContent
                    sx={{
                      p: 0,
                      pt: 1,
                    }}
                  >
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              height: "29px",
                              width: "29px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <img
                              src={gig.profileImage}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "700",
                              color: "#222325",
                            }}
                          >
                            {gig.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#404145",
                            }}
                          >
                            {gig.level}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item container xs={12} mt={1.5}>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#404145",
                            minHeight: 48,
                          }}
                        >
                          {gig.title}
                        </Typography>
                      </Grid>
                      <Grid item container xs={12} mt={1.5}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StarIcon
                            sx={{
                              fontSize: 19,
                              color: "#222325",
                              mt: -0.3,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: "700",
                              color: "#222325",
                              display: "flex",
                              alignItems: "center",
                              ml: 0.4,
                            }}
                          >
                            {gig.rating}
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "#74767e",
                                display: "flex",
                                ml: 0.5,
                              }}
                            >
                              ({gig.numReviews})
                            </Typography>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} mt={0.8}>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "#222325",
                          }}
                        >
                          From Rs.{gig.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <ViewGigModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        gigData={gigData}
      />
    </Box>
  );
}

export default ViewGigs;

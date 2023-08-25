import React from "react";
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function BlogsSubPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState(null);
  const usersCollectionRef = collection(db, "blogs");
  const { user } = useUserAuth();

  useEffect(() => {
    if (search === null || search === "") {
      const getBlogs = async () => {
        const data = await getDocs(usersCollectionRef);
        setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getBlogs();
    }
    searchBlogs();
  }, [search]);

  const searchBlogs = () => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
    setBlogs(filtered);
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
          width: "100%",
          height: "calc(100vh - 6rem)",
          left: "108px",
          top: "88px",
          background: "rgba(255, 255, 255, 0.73)",
          borderRadius: "41px",
        }}
      >
        <Grid>
          <Box
            sx={{
              width: "100%",
              height: "calc(110vh - 11rem)",
              position: "relative",
              background: "rgba(255, 255, 255, 0.73)",
              borderRadius: "20px",
              paddingTop: "4px",
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
            <Container>
              <Grid display="flex" justifyContent="right">
                <TextField
                  sx={{ my: "20px", width: "30vw" }}
                  label="Search..."
                  id="Content"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </Grid>
              <Grid container spacing={3}>
                {blogs.map((blog) => (
                  <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ maxWidth: 345, maxHeight: 300 }}>
                      <CardActionArea
                        onClick={() => {
                          navigate(`/blog-view`, {
                            state: { id: blog.id },
                          });
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={blog.image}
                          alt="green iguana"
                        />
                        {/* <CardHeader>
                  <Typography color='textPrimary'>hello</Typography>
                </CardHeader> */}
                        <CardContent>
                          <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                          >
                            {blog.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {blog.content}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default BlogsSubPage;

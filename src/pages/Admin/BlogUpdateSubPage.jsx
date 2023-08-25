import React, { useState, useEffect } from "react";
import { Box, Grid, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { db, storage } from "../../firebase-config";
import { doc, updateDoc, collection } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const BlogUpdateSubPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(location.state.title);
    setContent(location.state.content);
    console.log(location.state.id);
  }, []);

  const updateBlog = async () => {
    confirmAlert({
      message: "Are you sure to update your blog ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              setIsLoading(true);
              updateDoc(doc(db, "blogs", location.state.id), {
                title: title,
                content: content,
              }).then(() => navigate("/admin/blog"));
            } catch (err) {
              alert(err);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <Box
      sx={{
        mx: "60px",
        my: "30px",
      }}
    >
      <TextField
        fullWidth
        label="Title"
        id="Title"
        value={title}
        type="text"
        onInput={(e) => {
          e.target.value = e.target.value.slice(0, 70);
          setTitle(e.target.value);
          console.log(title);
        }}
      />
      <TextField
        fullWidth
        sx={{ my: "20px" }}
        multiline
        rows={15}
        label="Content"
        id="Content"
        value={content}
        onInput={(e) => {
          setContent(e.target.value);
        }}
      />

      <Grid container spacing={2} sx={{ mt: "5px" }}>
        <Grid item>
          <Button
            style={{
              backgroundColor: "#2A3036",
              padding: "5px 36px",
            }}
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              backgroundColor: "#3C56F5",
              padding: "5px 36px",
            }}
            variant="contained"
            onClick={() => {
              updateBlog();
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogUpdateSubPage;

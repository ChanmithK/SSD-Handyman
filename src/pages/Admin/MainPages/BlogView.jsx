import { Box, Button, Grid } from "@mui/material";
import React from "react";
import ButtonAppBar from "../../../components/Admin/AppBar";
import BlogViewSubPage from "../BlogViewSubPage";

function BlogViewAdmin() {
  return (
    <>
      <Grid container spacing={8} direction="column">
        <Grid item>
          <ButtonAppBar />
        </Grid>
        <Grid item>
          <BlogViewSubPage />
        </Grid>
      </Grid>
    </>
  );
}

export default BlogViewAdmin;

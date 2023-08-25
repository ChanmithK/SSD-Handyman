import { Box, Button, Grid } from "@mui/material";
import React from "react";
import ButtonAppBar from "../../../components/Admin/AppBar";
import BlogListSubPage from "../BlogListSubPage";

function BlogList() {
  return (
    <>
      <Grid container spacing={8} direction="column">
        <Grid item>
          <ButtonAppBar />
        </Grid>
        <Grid item>
          <BlogListSubPage />
        </Grid>
      </Grid>
    </>
  );
}

export default BlogList;

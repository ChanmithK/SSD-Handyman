import React from 'react';
import { Box, Button, Grid } from "@mui/material";
import ButtonAppBar from "../../../components/Admin/AppBar";
import BlogUpdateSubPage from '../BlogUpdateSubPage';

const BlogUpdate = () => {
    return (
        <>
        <Grid container spacing={8} direction="column">
          <Grid item>
            <ButtonAppBar />
          </Grid>
          <Grid item>
            <BlogUpdateSubPage />
          </Grid>
        </Grid>
      </>
    );
};

export default BlogUpdate;
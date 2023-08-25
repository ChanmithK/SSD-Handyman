import React from 'react';
import { Box, Button, Grid } from "@mui/material";
import ButtonAppBar from "../../../components/Admin/AppBar";
import AdminUserListSubPage from '../AdminUserListSubPage';

const AdminUserList = () => {
    return (
        <>
        <Grid container spacing={8} direction="column">
          <Grid item>
            <ButtonAppBar />
          </Grid>
          <Grid item>
            <AdminUserListSubPage />
          </Grid>
        </Grid>
      </>
    );
};

export default AdminUserList;
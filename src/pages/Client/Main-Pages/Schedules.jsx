import { Box, Grid } from "@mui/material";
import React from "react";
import MenuAppBar from "../../../components/Client/layouts/Appbar";
import MiniDrawer from "../../../components/Client/layouts/Drawer";
import SchedulesSubPage from "../SchedulesSubPage";
import classes from "./CustomGrid.module.css";

function Schedules() {
  return (
    <div>
      <div className={classes.row}>
        <div className={`${classes["col"]} ${classes["col-12"]}`}>
          <MenuAppBar />
        </div>
      </div>
      <div className={classes.row}>
        <div className={`${classes["col"]} ${classes["col-1"]}`}>
          <MiniDrawer />
        </div>
        <div className={`${classes["col"]} ${classes["col-11"]}`}>
          <SchedulesSubPage />
        </div>
      </div>
    </div>
  );
}

export default Schedules;

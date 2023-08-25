import * as React from "react";
import MenuAppBar from "../../../components/Client/layouts/Appbar";
import MiniDrawer from "../../../components/Client/layouts/Drawer";
import TrainersSubPage from "../TrainersSubPage";
import classes from "./CustomGrid.module.css";

export default function TrainersList() {
  return (
    // <Box direction="row" spacing={0} justifyContent="space-between">
    //   <MenuAppBar />
    //   <Grid container spacing={0}>
    //     <Grid item md={1}>
    //       <MiniDrawer />
    //     </Grid>
    //     <Grid item md={11}>
    //       <TrainersSubPage />
    //     </Grid>
    //   </Grid>
    // </Box>
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
          <TrainersSubPage />
        </div>
      </div>
    </div>
  );
}

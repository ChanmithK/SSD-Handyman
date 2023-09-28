import React from "react";
import MenuAppBar from "../../../components/Handyman/layouts/Appbar";
import MiniDrawer from "../../../components/Handyman/layouts/Drawer";
import classes from "./CustomGrid.module.css";
import CreateGig from "./SubPages/CreateGig";

function CreateGigMainPage() {
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
        <div
          className={`${classes["col"]} ${classes["col-11"]}`}
          style={{ paddingTop: 60 }}
        >
          <CreateGig />
        </div>
      </div>
    </div>
  );
}

export default CreateGigMainPage;

import React from "react";
import MenuAppBar from "../../../components/Client/layouts/Appbar";
import MiniDrawer from "../../../components/Client/layouts/Drawer";
import classes from "./CustomGrid.module.css";
import ViewGigs from "./SubPages/ViewGigs";

function ViewGigMainPage() {
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
          <ViewGigs />
        </div>
      </div>
    </div>
  );
}

export default ViewGigMainPage;

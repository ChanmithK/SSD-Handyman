import React from "react";
import MenuAppBar from "../../../components/Handyman/layouts/Appbar";
import MiniDrawer from "../../../components/Handyman/layouts/Drawer";
import classes from "../Customer/CustomGrid.module.css";
import Profile from "./SubPages/Profile";

function ProfileMainPage() {
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
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default ProfileMainPage;
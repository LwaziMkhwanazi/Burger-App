import React from "react";

import classes from "./Layout.module.css";
import Auxilary from "../../hoc/Auxilary";
const Layout = (props) => (
  <Auxilary>
    <div>Toolbar, SideDrawer, Backdrower</div>
    <main className={classes.Content}>{props.children}</main>
  </Auxilary>
);

export default Layout;

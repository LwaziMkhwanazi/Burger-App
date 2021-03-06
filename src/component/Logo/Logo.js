import React from "react";
import classes from "./Logo.module.css";
import burgerLogo from "../../assets/Image/burger-logo.png";
const Logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="Burger" />
  </div>
);
export default Logo;

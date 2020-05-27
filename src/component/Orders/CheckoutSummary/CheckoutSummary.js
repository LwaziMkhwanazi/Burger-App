import React from "react";
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h2>We Hope It test Well! </h2>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked = {props.handleCancel} btnType="Danger">CANCEL</Button>
      <Button clicked = {props.handleContinue} btnType="Success">CONTINUE</Button>
    </div>
  );
};
export default CheckoutSummary;

import React from "react";
import Axilary from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Axilary>
        <h3>Your Order</h3>
        <p>A Delicious Burger With The Following Ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <strong>Total Price :SZL {this.props.price.toFixed(2)}</strong>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinue} btnType="Success">
          SUCCESS
        </Button>
      </Axilary>
    );
  }
}

export default OrderSummary;

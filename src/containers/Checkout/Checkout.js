import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/Contact-data";
import CheckoutSummary from "../../component/Orders/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const quiry = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of quiry.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.push({
      pathname: "checkout/contact-details",
      search: "",
    });
  };
  render() {
    console.log(this.state.price);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          handleCancel={this.checkoutCancelHandler}
          handleContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-details"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;

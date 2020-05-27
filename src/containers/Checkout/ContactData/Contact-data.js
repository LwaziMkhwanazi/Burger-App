import React, { Component } from "react";
import Button from "../../../component/UI/Button/Button";
import Spinner from "../../../component/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import classes from "./Contactdetails.module.css";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalcode: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    console.log(this.props.price);
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      customerDetails: {
        name: "Lwazi",
        surname: "Mkhwanazi",
        phoneNumber: "26876134090",
        address: "house 193 twosticks Manzini",
      },
      deliveryMethode: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((Response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ loading: false }));
  };
  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalcode"
          placeholder="Your Postal code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER NOW
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Details</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;

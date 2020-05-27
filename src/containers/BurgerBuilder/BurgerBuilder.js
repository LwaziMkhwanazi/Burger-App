import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary/Auxilary";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/UI/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../component/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 1.5,
  cheese: 2.5,
  meat: 5.3,
  bacon: 5.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    totalPrice: 9.5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://burger-app-36a80.firebaseio.com/ingredients.json")
      .then((Response) => {
        this.setState({ ingredients: Response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatedPurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    const upDatedCount = oldCount + 1;

    const upDatedIngredient = {
      ...this.state.ingredients,
    };
    upDatedIngredient[type] = upDatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: upDatedIngredient });
    this.updatedPurchaseState(upDatedIngredient);
  };

  removingIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const upDatedCount = oldCount - 1;
    const upDatedIngredient = {
      ...this.state.ingredients,
    };
    upDatedIngredient[type] = upDatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: upDatedIngredient });
    this.updatedPurchaseState(upDatedIngredient);
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancellHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    //alert("You Continue");
    
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURI(i) + "=" + encodeURI(this.state.ingredients[i])
      );
    }
    queryParams.push('price='+ this.state.totalPrice)
    const quiryString = queryParams.join("&");
    this.props.history.push({
      pathname: "checkout",
      search: "?" + quiryString,
    });
  };
  render() {
    const disabledInfor = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfor) {
      disabledInfor[key] = disabledInfor[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cant be Loaded, Sorry</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Auxilary>
          (<Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removingIngredientHandler}
            disabled={disabledInfor}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchasingHandler}
          />
        </Auxilary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancellHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Auxilary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancellHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxilary>
    );
  }
}
export default withErrorHandler(BurgerBuilder, axios);

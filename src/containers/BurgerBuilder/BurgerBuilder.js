import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary/Auxilary";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/UI/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

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
    alert("You Continue");
  };
  render() {
    const disabledInfor = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfor) {
      disabledInfor[key] = disabledInfor[key] <= 0;
    }
    return (
      <Auxilary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancellHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancellHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price ={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />

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
  }
}
export default BurgerBuilder;

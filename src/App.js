import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Route } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
      </Layout>
    </div>
  );
}

export default App;

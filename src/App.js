import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./components/loginCompenent/loginComponent";
import MainPage from "./components/mainPageComponent/mainPageComponent";
import ProductOrderPage from "./components/productOrderComponent/ProductOrderPage";
import ConfirmOrderComponent from "./components/ConfirmOrderComponent/confirmOrderComponent";
import OrderSuccessPage from "./components/OrderSuccessPageComponent/orderSuccessPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/productOrder" component={ProductOrderPage} />
          <Route
            exact
            path="/confirmOrder"
            render={(props) => (
              <ConfirmOrderComponent {...props} selectedProduct={props.selectedProduct} />
            )}
          />
          <Route exact path="/orderSuccess" component={OrderSuccessPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import HeaderComponent from "../headerComponent/headerComponent";
import "./orderSuccessPage.css"

function OrderSuccessPage() {
  return (
    <div>
      <HeaderComponent title="Order Confirmation" />
      <div className="order-success-page">
        <h2>Your order has been confirmed!</h2>
        <p>Thank you for shopping with us.</p>
        <Link to="/productOrder">
          <Button variant="success">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccessPage;

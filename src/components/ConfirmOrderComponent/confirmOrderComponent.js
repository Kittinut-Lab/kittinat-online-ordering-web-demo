import { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import HeaderComponent from "../headerComponent/headerComponent";
import { useSelector } from "react-redux";
import ApiCenter from "../../services/apiCenter.service";

import "./confirmOrderComponent.css";

function ConfirmOrderPage({ location }) {
  const history = useHistory();
  const selectedProduct = location.state?.selectedProduct;
  const customerData = useSelector((state) => state.customerData);

  const [formData, setFormData] = useState({
    customerId: customerData.id,
    productId: selectedProduct.id,
    productName: selectedProduct.name,
    price: selectedProduct.price,
    name: "",
    email: "",
    address: "",
    quantity: 1,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Order form submitted:", formData);

    try {
      const response = await ApiCenter.confirmOrder(
        formData.customerId,
        formData.productId,
        formData.quantity,
        formData.price,
        formData.name
      );
      // * handle successful login
      if (response.code === "BR-XX-XX00") {
        // * Navigate to the main page on successful login
        return history.push("/orderSuccess");
      } else {
        console.log(`${response.msg}`);
      }
    } catch (error) {
      // handle error logging in
      console.log(`error : ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleQuantityChange = (event) => {
    const { value } = event.target;
    setFormData((prevState) => ({ ...prevState, quantity: Number(value) }));
  };

  return (
    <div>
      <HeaderComponent title="Confirm Order" />
      <div className="confirm-order-page">
        {selectedProduct && (
          <div>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <div>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.desc}</p>
              <p>${selectedProduct.price}</p>
            </div>
          </div>
        )}

        <div>
          <h3>Enter your information to confirm your order:</h3>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                as="select"
                name="quantity"
                value={formData.quantity}
                onChange={handleQuantityChange}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="danger"
              onClick={() => history.goBack()}
              className="mr-3"
            >
              Cancel Order
            </Button>

            <Button variant="success" type="submit">
              Confirm Order
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ConfirmOrderPage);

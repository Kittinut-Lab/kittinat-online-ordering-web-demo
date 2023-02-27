import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ConfirmOrderPage from "../ConfirmOrderComponent/confirmOrderComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import HeaderComponent from "../headerComponent/headerComponent";
import ApiCenter from "../../services/apiCenter.service";

import "./ProductOrderPage.css";


function ProductOrderingPage() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await ApiCenter.listProducts();
        if (response.code === "BR-XX-XX00") {
          setProducts(response.products);
          setLoading(false);

         
        }
      } catch (error) {
        console.log(`error : ${error.message}`);
      }
    }
    loadProduct();
  }, []);

  // *  Selecting the product id.
  const handleSelectProduct = (productId) => {
    const product = products.find((p) => p.id === productId);
    console.log(`${JSON.stringify(product)}`);
    setSelectedProduct(product);
  };

  useEffect(() => {
    if (selectedProduct) {
      history.push({
        pathname: "/confirmOrder",
        state: { selectedProduct: selectedProduct },
      });
    }
  }, [selectedProduct]);

  return (
    <div>
      <HeaderComponent title="Product Ordering Page" />

      <div className="product-list-container">
        <Row xs={1} md={2} lg={4}>
          {products.map((product) => (
            <Col key={product.id} className="product-container">
              <div className="product-card">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-details">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-description">
                    {product.desc.length > 80
                      ? product.desc.slice(0, 80) + "..."
                      : product.desc}
                  </p>
                </div>
                <div className="product-price">${product.price}</div>
                <Button
                  variant="outline-success"
                  onClick={() => handleSelectProduct(product.id)}
                >
                  SELECT
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ProductOrderingPage;

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

// const products2 = [
//   {
//     id: 1,
//     image: "https://picsum.photos/200",
//     name: "Product 1",
//     price: 10,
//     desc: "This is the description of product 1",
//   },
//   {
//     id: 2,
//     image: "https://picsum.photos/200",
//     name: "Product 2",
//     price: 15,
//     description: "This is the description of product 2",
//   },
//   {
//     id: 3,
//     image: "https://picsum.photos/200",
//     name: "Product 3",
//     price: 20,
//     description: "This is the description of product 3",
//   },
//   {
//     id: 4,
//     image: "https://picsum.photos/200",
//     name: "Product 4",
//     price: 25,
//     description: "This is the description of product 4",
//   },
//   {
//     id: 5,
//     image: "https://picsum.photos/200",
//     name: "Product 5",
//     price: 30,
//     description: "This is the description of product 5",
//   },
//   {
//     id: 6,
//     image: "https://picsum.photos/200",
//     name: "Product 6",
//     price: 35,
//     description: "This is the description of product 6",
//   },
//   {
//     id: 7,
//     image: "https://picsum.photos/200",
//     name: "Product 7",
//     price: 40,
//     description: "This is the description of product 7",
//   },
//   {
//     id: 8,
//     image: "https://picsum.photos/200",
//     name: "Product 8",
//     price: 45,
//     description: "This is the description of product 8",
//   },
//   {
//     id: 9,
//     name: "Product 9",
//     price: 50,
//     description: "This is the description of product 9",
//   },
//   {
//     id: 10,
//     name: "Product 10",
//     price: 55,
//     description: "This is the description of product 10",
//   },
//   {
//     id: 11,
//     name: "Product 11",
//     price: 60,
//     description: "This is the description of product 11",
//   },
//   {
//     id: 12,
//     name: "Product 12",
//     price: 65,
//     description: "This is the description of product 12",
//   },
//   {
//     id: 13,
//     name: "Product 13",
//     price: 70,
//     description: "This is the description of product 13",
//   },
//   {
//     id: 14,
//     name: "Product 14",
//     price: 75,
//     description: "This is the description of product 14",
//   },
//   {
//     id: 15,
//     name: "Product 15",
//     price: 80,
//     description: "This is the description of product 15",
//   },
//   {
//     id: 16,
//     name: "Product 16",
//     price: 85,
//     description: "This is the description of product 16",
//   },
//   {
//     id: 17,
//     image: "https://picsum.photos/200",
//     name: "Product 17",
//     price: 90,
//     description: "This is the description of product 17",
//   },
//   {
//     id: 18,
//     image: "https://picsum.photos/200",
//     name: "Product 18",
//     price: 95,
//     description: "This is the description of product 18",
//   },
//   {
//     id: 19,
//     image: "https://picsum.photos/200",
//     name: "Product 19",
//     price: 100,
//     description: "This is the description of product 19",
//   },
//   {
//     id: 20,
//     image: "https://picsum.photos/200",
//     name: "Product 20",
//     price: 105,
//     description: "This is the description of product 20",
//   },
// ];

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

import React from "react";
import { useHistory } from "react-router-dom";
import "./headerComponent.css";

function HeaderComponent({ title }) {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/");
  };

  const handleProductsClick = () => {
    history.push("/productOrder");
  };

  return (
    <header className="header">
      <h1 className="title">{title}</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" onClick={handleHomeClick}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={handleProductsClick}>
              Products
            </a>
          </li>
          <li className="nav-item">
            <a>Contact Us</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderComponent;

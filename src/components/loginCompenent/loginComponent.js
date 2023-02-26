import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ApiCenter from "../../services/apiCenter.service";

import "./loginComponent.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory(); // Get the history object from react-router-dom
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Implement login functionality
    console.log(`login hit! : ${username} , ${password}`);

    try {
      const response = await ApiCenter.login(username, password);
      // * handle successful login
      if (response.code === "BR-XX-XX00") {

        // * Save customer data to redux.
        dispatch({
          type: "SAVE_CUSTOMER_DATA",
          payload: { id: response.customerId, name: response.customerName },
        });

        // * Navigate to the main page on successful login
        return history.push("/productOrder");
      } else {
        setError(`${response.msg}`);
      }
    } catch (error) {
      // handle error logging in
      setError(`error : ${error.message}`);
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-banner md-3">
          <h2>Login</h2>
        </div>
        {error && <p className="error-message">{error}</p>}
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={username}
              onChange={handleUsernameChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);

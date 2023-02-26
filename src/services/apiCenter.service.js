import axios from "axios";

const BASE_URL = "http://localhost:5001/api/v1";

class ApiCenter {
  async login(username, password) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: username,
        mobileNo: password,
      });
      return response.data;
    } catch (error) {
      console.error("Error while logging in: ", error);
      throw error;
    }
  }

  async listProducts() {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error("Error while listProducts in: ", error);
      throw error;
    }
  }

  async confirmOrder(customerID, productID, amount, productPrice, productName) {
    try {
      const response = await axios.post(`${BASE_URL}/confirmOrder`, {
        customerID: customerID,
        productID: productID,
        amount: amount,
        productPrice: productPrice,
        productName: productName,
      });
      return response.data;
    } catch (error) {
      console.error("Error while listProducts in: ", error);
      throw error;
    }
  }
}

export default new ApiCenter();

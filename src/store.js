import { createStore } from "redux";

const initialState = {
  customerData: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_CUSTOMER_DATA":
      return { ...state, customerData: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;

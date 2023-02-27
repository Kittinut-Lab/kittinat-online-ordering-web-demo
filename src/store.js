import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  customerData: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CUSTOMER_DATA':
      return { ...state, customerData: action.payload };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

import React from "react";
import { Provider } from "react-redux";

import AppNavigator from "./navigator/AppNavigator";
import store from "./store/congifureStore";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

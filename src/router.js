import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./app/app";
import { store } from "./store/store";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
  },
]);

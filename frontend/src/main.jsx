import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);

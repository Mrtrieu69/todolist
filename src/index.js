import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { GlobalStyles } from "./components";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <Router>
                    <App />
                </Router>
            </GlobalStyles>
        </Provider>
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

import { animateScroll as scroll } from 'react-scroll';
import ReactGA from 'react-ga';

ReactGA.initialize('G-5W93GCZSFP');
ReactGA.pageview(window.location.pathname + window.location.search);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
        <App />
   
        </HelmetProvider>
    </PersistGate>
  </Provider>
);
scroll.scrollToTop({
  duration: 500,
  smooth: true,
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

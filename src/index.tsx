import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider } from "antd";
import NotificationProvider from "components/Context/Notification";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routing from "./Routes";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Raleway', sans-serif",
        },
        components: {
          Spin: {
            colorPrimary: "#EF897A",
          },

          Button: {
            colorPrimary: "#EF897A",
            colorPrimaryHover: "#F6A295",
            colorPrimaryActive: "#D85E4D",
            colorBgContainerDisabled: "#F3F4F8",
            colorTextDisabled: "#B3B5BC",
            colorLink: "#4E97D9",
            colorLinkActive: "#2774BA",
            colorLinkHover: "#79B7EF",
            colorBgTextHover: "#F3F4F8",
            colorBgTextActive: "#FAFAFA",
            borderRadius: 2,
            borderRadiusLG: 2,
            borderRadiusSM: 2,
            borderRadiusXS: 2,
            borderRadiusOuter: 2,
          },
        },
      }}
    >
      <NotificationProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <BrowserRouter>
              <Routing />
            </BrowserRouter>
          </Provider>
        </GoogleOAuthProvider>
      </NotificationProvider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

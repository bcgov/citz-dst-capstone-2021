import { css, Global } from "@emotion/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
import typography from "./typography";

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        html,
        body {
          ${typography.toString()}
          margin: 0;
          padding: 0;
          min-height: "100vh";
          max-width: "100vw";
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        #root {
        }
        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }
        .misc-class-m-dropdown-select {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .misc-class-m-dropdown-link {
          text-decoration: none;
          color: ${theme.colors.bcblue};
        }

        .misc-class-m-form-submit-btn:active {
          position: relative;
          top: 1px;
        }
      `}
    />
    <App />,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

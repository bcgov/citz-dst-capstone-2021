// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// import { KeycloakProvider } from '@react-keycloak/web';
// import { ThemeProvider } from "emotion-theming";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import AppRouter from "./AppRouter";
// import keycloak from './keycloak';
import theme from "./theme";

// const eventLogger = (event: unknown, error: unknown) => {
//   console.log('onKeycloakEvent', event, error)
// }

// const tokenLogger = (tokens: unknown) => {
//   console.log('onKeycloakTokens', tokens)
// }

const App = () => (
  // <KeycloakProvider keycloak={keycloak}>
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
  // </KeycloakProvider>
);

export default App;

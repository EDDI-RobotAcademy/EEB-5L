import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import GoogleAuthenticationPage from "./pages/GoogleAuthenticationPage.tsx";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <GoogleAuthenticationPage/>
  </div>
);

export default App
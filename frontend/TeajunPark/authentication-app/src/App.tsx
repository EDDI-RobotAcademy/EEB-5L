import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import SocialAuthenticationButton from "./ui/components/SocialAuthenticationButton.tsx";

const App = () => (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
        <div>Name: authentication-app</div>
        <div>Framework: react-18</div>
        <SocialAuthenticationButton/>
    </div>
);

export default App
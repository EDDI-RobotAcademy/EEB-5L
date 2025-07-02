import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import mitt from 'mitt';
// npm install mitt

const NavigationBarApp = lazy(() => import("navigationBarApp/App"));
// const KakaoAuthenticationApp = lazy(() => import("kakaoAuthenticationApp/App"));
// const GoogleAuthenticationApp = lazy(() => import("googleAuthenticationApp/App"));
const AuthenticationApp = lazy(() => import("authenticationApp/App"));

import VueBoardAppWrapper from "./VueBoardAppWrapper.tsx";
import DiceGameAppWrapper from "./DiceGameAppWrapper.tsx";

const eventBus = mitt();

const App = () => {
    const [isNavigationBarLoaded, setIsNavigationBarLoaded] = useState(false);

    useEffect(() => {
        import("navigationBarApp/App")
            .then(() => setIsNavigationBarLoaded(true))
            .catch((err) => console.error("Failed to load navigation bar:", err));
    }, []);

    return (
        <BrowserRouter>
            <Suspense fallback={<CircularProgress />}>
                <NavigationBarApp />

                <Routes>
                    <Route path="/" element={<div>Home Page</div>} />
                    {/*<Route path="/kakao-authentication/*" element={<KakaoAuthenticationApp />} />*/}
                    {/*<Route path="/google-authentication/*" element={<GoogleAuthenticationApp />} />*/}
                    <Route path="/vue-board/*" element={<VueBoardAppWrapper eventBus={eventBus}/>} />
                    <Route path="/dice-game" element={<DiceGameAppWrapper />} />
                    <Route path="/authentication/*" element={<AuthenticationApp />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;

const container = document.getElementById("app") as HTMLElement;
if (!container) {
    throw new Error("Root container #app not found");
}

const root = ReactDOM.createRoot(container);
root.render(<App />);
import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import mitt from 'mitt';
// npm install mitt

const NavigationBarApp = lazy(() => import("navigationBarApp/App"));
// const HtmlCssTestApp = lazy(() => import("htmlCssTestApp/App"));
// const JavascriptTestApp = lazy(() => import("javascriptTestApp/App"));
const KakaoAuthenticationApp = lazy(() => import("kakaoAuthenticationApp/App"));
const GoogleAuthenticationApp = lazy(() => import("googleAuthenticationApp/App"));
// const ReactTestApp = lazy(() => import("reactTestApp/App"));
// const RecoilBoardApp = lazy(() => import("recoilBoardApp/App"))
const AuthenticationApp = lazy(() => import("authenticationApp/App"));

// import VuetifyTailwindBoardAppWrapper from "./VuetifyTailwindBoardAppWrapper";
import VueBoardAppWrapper from "./VueBoardWrapper.tsx";
import DiceGameAppWrapper from "./DiceGameAppWrapper.tsx";
import VTestWrapper from "./VTestWrapper.tsx";

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
                    {/*<Route path="/html-css-test" element={<HtmlCssTestApp />} />*/}
                    {/*<Route path="/js-test" element={<JavascriptTestApp />} />*/}
                    <Route path="/kakao-authentication/*" element={<KakaoAuthenticationApp />} />
                    {/*<Route path="/board/*" element={<VuetifyTailwindBoardAppWrapper />} />*/}
                    {/*<Route path="/react-test" element={<ReactTestApp />} />*/}
                    <Route path="/google-authentication/*" element={<GoogleAuthenticationApp />} />
                    {/*<Route path="/recoil-board/*" element={<RecoilBoardApp />} />*/}
                    <Route path="/vue-board/*" element={<VueBoardAppWrapper eventBus={eventBus}/>} />
                    <Route path="/dice-game" element={<DiceGameAppWrapper />} />
                    <Route path="/authentication/*" element={<AuthenticationApp />} />
                    <Route path="/vtest/*" element={<VTestWrapper eventBus={eventBus}/>} />
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
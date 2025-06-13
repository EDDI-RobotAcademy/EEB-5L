import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const NavigationBarApp = lazy(() => import("navigationBarApp/App"));
const HtmlCssTestApp = lazy(() => import("htmlCssTestApp/App"));
const JavascriptTestApp = lazy(() => import("javascriptTestApp/App"));
const KakaoAuthenticationApp = lazy(() => import("kakaoAuthenticationApp/App"));
const ReactTestApp = lazy(() => import("reactTestApp/App"));
const GoogleAuthenticationApp = lazy(() => import("googleAuthenticationApp/App"));
const RecoilBoardApp = lazy(() => import("recoilBoardApp/App"));


import VuetifyTailwindBoardAppWrapper from "./VuetifyTailwindBoardAppWrapper";

const App = () => {
    const [isNavigationBarLoaded, setIsNavigationBarLoaded] = useState(false);

    useEffect(() => {
        import("navigationBarApp/App")
            .then(() => setIsNavigationBarLoaded(true))
            .catch((err) => console.error("Failed to load navigation bar:", err));
    }, []);

    // @ts-ignore
    return (
        <BrowserRouter>
            <Suspense fallback={<CircularProgress />}>
                <NavigationBarApp />

                <Routes>
                    <Route path="/" element={<div>Home Page</div>} />
                    <Route path="/html-css-test" element={<HtmlCssTestApp />} />
                    <Route path="/js-test" element={<JavascriptTestApp />} />
                    <Route path="/kakao-authentication/*" element={<KakaoAuthenticationApp />} />
                    <Route path="/board/*" element={<VuetifyTailwindBoardAppWrapper />} />
                    <Route path="/react-test" element={<ReactTestApp />} />
                    <Route path="/google-authentication/*" element={<GoogleAuthenticationApp />} />
                    <Route path="/recoil-board/*" element={<RecoilBoardApp />} />
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
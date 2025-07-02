import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import mitt from 'mitt';

import VueBoardAppWrapper from "./wrapper/VueBoardWrapper.tsx";
import {CircularProgress, Modal} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DiceGameAppWrapper from "./wrapper/DiceGameAppWrapper";

const NavigationBarApp = lazy(() => import("navigationBarApp/App"));
// const HtmlCssTestApp = lazy(() => import("htmlCssTestApp/App"));
// const JavascriptTestApp = lazy(() => import("javascriptTestApp/App"));
// const KakaoAuthenticationApp = lazy(() => import("kakaoAuthenticationApp/App"));
// const ReactTestApp = lazy(() => import("reactTestApp/App"));
const PracticeApp = lazy(() => import("practiceApp/App"));
// const ModalTestApp = lazy(() => import("modalTestApp/App"));
// const GoogleAuthenticationApp = lazy(() => import("googleAuthenticationApp/App"));
// const RecoilBoardApp = lazy(() => import("recoilBoardApp/App"));
const AuthenticationApp = lazy(() => import("authenticationApp/App"));



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
                    <Route path="/" element={<div> Home Page</div>} />
                    {/*<Route path="/html-css-test" element={<HtmlCssTestApp />} />*/}
                    {/*<Route path="/js-test" element={<JavascriptTestApp />} />*/}
                    {/*<Route path="/react-test" element={<ReactTestApp />} />*/}
                    <Route path="/practice-app" element={<PracticeApp />} />
                    {/*<Route path="/kakao-authentication/*" element={<KakaoAuthenticationApp />} />*/}
                    {/*<Route path="/modal-test/*" element={<ModalTestApp/>} />*/}
                    {/*<Route path="/google-authentication/*" element={<GoogleAuthenticationApp />} />*/}
                    {/*<Route path="/recoil-board/*" element={<RecoilBoardApp/>} />*/}
                    <Route path="/dice-game" element={<DiceGameAppWrapper />} />
                    <Route path="/vue-board/*" element={<VueBoardAppWrapper eventBus={eventBus}/>} />
                    <Route path="/authentication" element={<AuthenticationApp />} />
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

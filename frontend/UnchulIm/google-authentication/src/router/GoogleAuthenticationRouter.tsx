import React, { Suspense } from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import GoogleAuthenticationPage from "../pages/GoogleAuthenticationPage.tsx";


const GoogleAuthenticationRouter = () => {
    return (
        <Suspense fallback={<div>로딩중 ........</div>}>
            <Routes>
                <Route path="/" element={<Navigate to="login" replace/>}/>
                <Route path="/login" element={<GoogleAuthenticationPage/>}/>
            </Routes>
        </Suspense>
    );
};

export default GoogleAuthenticationRouter;
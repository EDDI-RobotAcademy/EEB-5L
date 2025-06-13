import React from "react";
import { Box, Typography } from "@mui/material";
import SocialLoginButton from "../ui/components/SocialLoginButton";

import {useNavigate} from "react-router-dom";
import env from "../env.ts";

const GoogleAuthenticationPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        const googleAuthenticationUrl = env.api.GOOGLE_AUTHENTICATION_URL;
        const popup = window.open(googleAuthenticationUrl, '_blank', 'width=500,height=600');

        if (!popup) {
            alert('팝업 차단되어 있습니다. 팝업 허용 후 다시 시도하세요.');
            return;
        }

        const receiveMessage = (event: MessageEvent) => {
            console.log('📨 받은 메시지:', event.origin, event.data);

            if (!event.origin.startsWith('http://localhost')) {
                console.warn('❌ 허용되지 않은 origin:', event.origin);
                return;
            }

            const { accessToken, user } = event.data;
            if (!accessToken) {
                console.warn('❌ accessToken 없음');
                return;
            }

            localStorage.setItem('userToken', accessToken);
            window.dispatchEvent(new Event("user-token-changed"));

            window.removeEventListener('message', receiveMessage);

            try {
                popup.close();
            } catch (e) {
                console.warn('팝업 닫기 실패:', e);
            }

            setTimeout(() => {
                navigate('/');
            }, 100);
        };

        window.addEventListener('message', receiveMessage);
    };

    return (
        <Box sx={{ p: 4, maxWidth: 400, margin: "0 auto" }}>
            <Typography variant="h5" gutterBottom>
                로그인
            </Typography>
            <SocialLoginButton provider="google" onClick={handleGoogleLogin} />
        </Box>
    );
};

export default GoogleAuthenticationPage;
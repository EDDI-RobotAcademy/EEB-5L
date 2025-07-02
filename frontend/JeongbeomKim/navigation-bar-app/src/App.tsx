import React, {useEffect, useState} from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import JavascriptIcon from "@mui/icons-material/Javascript";
import ForumIcon from "@mui/icons-material/Forum";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import KakaoAuthenticationRouter from "./router/NavigationRouter.tsx";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: 'bold',
                    }}
                >
                    EDDI
                </Typography>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    startIcon={<HomeIcon />}
                />
                <Button
                    color="inherit"
                    component={Link}
                    to="/vue-board/list"
                    startIcon={<ForumIcon />}
                >
                    V게시판
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/social-authentication"
                    startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                >
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default App
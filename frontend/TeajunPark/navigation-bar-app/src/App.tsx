import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import JavascriptIcon from "@mui/icons-material/Javascript";
import ForumIcon from "@mui/icons-material/Forum";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    const handleLoginMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLoginMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    EDDI
                </Typography>

                <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/board/list" startIcon={<ForumIcon />}>
                    게시판
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/dice-game"  // ← 원하는 경로로 이동
                    sx={{ ml: 1 }}    // 왼쪽 여백 추가로 로그인 버튼과 간격
                >
                    🎲주사위 게임
                </Button>

                {/* 로그인 or 로그아웃 버튼 */}
                {isLoggedIn ? (
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                    >
                        로그아웃
                    </Button>
                ) : (
                    <>
                        <Button
                            color="inherit"
                            onClick={handleLoginMenuOpen}
                            startIcon={<LoginIcon />}
                        >
                            로그인
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleLoginMenuClose}
                        >
                            <MenuItem
                                component="a"
                                href="http://localhost/kakao-authentication/login"
                            >
                                카카오 로그인
                            </MenuItem>
                            <MenuItem
                                component="a"
                                href="http://localhost/google-authentication/login"
                            >
                                구글 로그인
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default App;

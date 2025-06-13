import React from "react";
import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {Link} from "react-router-dom";
import styled from "styled-components";

import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import JavascriptIcon from "@mui/icons-material/Javascript";
import ForumIcon from "@mui/icons-material/Forum";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const App: React.FC = () => {
    return (
        <NavBar>
            <NavItems>
                <LogoBox>
                    EDDI
                </LogoBox>
                <MenuBox>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/"
                        startIcon={<HomeIcon/>}
                    >
                        <TextBox>
                            Home
                        </TextBox>
                    </Button>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/html-css-test"
                        startIcon={<CodeIcon/>}
                    >
                        <TextBox>
                            HTML/CSS Test
                        </TextBox>
                    </Button>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/js-test"
                        startIcon={<JavascriptIcon/>}
                    >
                        <TextBox>
                            Javascript Test
                        </TextBox>
                    </Button>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/board/list"
                        startIcon={<ForumIcon/>}
                    >
                        <TextBox>
                            게시판
                        </TextBox>
                    </Button>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/react-test"
                        startIcon={<SportsGymnasticsIcon/>}
                    >
                        <TextBox>
                            React 실험
                        </TextBox>
                    </Button>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/practice"
                        startIcon={<ChecklistOutlinedIcon/>}
                    >
                        <TextBox>
                            Practice
                        </TextBox>
                    </Button>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/recoil-board"
                        startIcon={<ChecklistOutlinedIcon/>}
                    >
                        <TextBox>
                            recoil
                        </TextBox>
                    </Button>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/kakao-authentication/login"
                        startIcon={<ExitToAppIcon/>}
                    >
                        <TextBox>
                            카카오로그인
                        </TextBox>
                    </Button>
                    <Button
                        sx={{minWidth: 'auto', padding: '6px 8px', margin: 0}}
                        color="inherit"
                        component={Link}
                        to="/google-authentication/login"
                        startIcon={<ExitToAppIcon/>}
                    >
                        <TextBox>
                            구글로그인
                        </TextBox>
                    </Button>
                </MenuBox>
            </NavItems>
        </NavBar>
    );
};

export default App

const NavBar = styled.div`
    position: fixed;
    width: 100vw;
    height: 62px;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: gold;
    z-index: 999;
    box-shadow: 0 3px 5px gray 80%;
`
const NavItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 /* 20px */;
    padding-right: 20px;
`
const LogoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: bolder;
`
const MenuBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`
const TextBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 14px;
    color: black;
    padding: 0px;
    @media screen and (max-width: 950px) {
        display: none;
    }
`
import React from 'react';
import './App.css';
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppSelector} from "./state/store";
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbars} from "./Components/ErrorSnackBar/ErrorSnackBar";
import {Login} from "./Components/Login/Login";
import {TodolistsList} from "./Components/TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {NotFound} from "./Components/404/404";

function AppWithRedux() {

    const status = useAppSelector<RequestStatusType>((state) => state.appStatus.status)

    return (
        <div className="App">
            <ErrorSnackbars/>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed style={{padding: "20px 0"}}>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<NotFound/>}/>
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default AppWithRedux;

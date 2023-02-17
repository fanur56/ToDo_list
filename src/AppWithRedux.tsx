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
import {Route, Routes} from "react-router-dom";

function AppWithRedux() {
    const status = useAppSelector<RequestStatusType>((state) => state.appStatus.status)

    return (
        <div className="App">
            <ErrorSnackbars />
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
                </Routes>
                <TodolistsList/>
            </Container>
            <Login/>
        </div>
    );
}

export default AppWithRedux;

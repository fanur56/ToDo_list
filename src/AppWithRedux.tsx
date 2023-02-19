import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button, CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {AppDispatch, useAppSelector} from "./state/store";
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbars} from "./Components/ErrorSnackBar/ErrorSnackBar";
import {Login} from "./Components/Login/Login";
import {TodolistsList} from "./Components/TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {NotFound} from "./Components/404/404";
import {logOutTC, meTC} from "./Components/Login/auth-reducer";

function AppWithRedux() {

    const dispatch = AppDispatch()
    const status = useAppSelector<RequestStatusType>((state) => state.appStatus.status)
    const isInitialized = useAppSelector<boolean>((state) => state.appStatus.isInitialized)
    const isLoggedIn = useAppSelector<boolean | null>((state) => state.auth.isLoggedIn)

    const logOutHandler=()=>dispatch(logOutTC())

    useEffect(()=>{
        dispatch(meTC())
    }, [])

    if (!isInitialized) {
        return <div style = {{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }

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
                    { isLoggedIn && <Button color={"inherit"}
                            variant={"outlined"}
                            onClick={logOutHandler}>Log out</Button>}
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

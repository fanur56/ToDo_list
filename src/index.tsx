import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {teal, yellow} from "@mui/material/colors";
import {createRoot} from "react-dom/client";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: yellow
    }
})

const root = createRoot(
    document.getElementById('root') as HTMLElement
); 

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppWithRedux/>
        </ThemeProvider>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


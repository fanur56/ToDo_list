import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    ChangeTodoListFilterAC,
    ChangeTodoListTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    filterValueType,
    getTodolistsTC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {addTaskTC, changeTaskTitleTC, removeTaskTC, updateTaskTC} from "./state/task-reducer";
import {AppDispatch, useAppSelector} from "./state/store";
import {TaskStatuses} from "./api/todolists-api";
import {TaskStateType} from "./App";
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbars} from "./Components/ErrorSnackBar/ErrorSnackBar";

function AppWithRedux() {

    const status = useAppSelector<RequestStatusType>((state) => state.appStatus.status)

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    let todoLists = useAppSelector<Array<TodolistDomainType>>(state => state.todoLists)
    let tasks = useAppSelector<TaskStateType>(state => state.tasks)
    const dispatch = AppDispatch()

    const addTask = useCallback((newTitle: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, newTitle))
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskTC(todoListID, taskId))
    }, [dispatch])

    const changeCheckbox = useCallback((taskId: string, value: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskTC(todoListID, taskId, value))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleTC(taskId, newTitle, todoListID))
    }, [dispatch])

    const changeTodoListFilter = useCallback((filterValue: filterValueType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filterValue))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(ChangeTodoListTitleTC(newTitle, id))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodolistTC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const todoListsComponent = todoLists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: "20px"}}>
                    <Todolist
                        id={tl.id}
                        changeCheckbox={changeCheckbox}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                        entityStatus={tl.entityStatus}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
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
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListsComponent}
                    <ErrorSnackbars />
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

import React, {useCallback, useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStateType, TodoListType} from "./App";

export type filterValueType = 'All' | 'Active' | 'Completed';


function AppWithRedux() {
    const todoListID_1 = v1();
    const todoListID_2 = v1();

   /* const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'}
    ])*/

   /* const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
            [todoListID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "JSX", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false}
            ],
            [todoListID_2]: [
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "IceCream", isDone: false},
                {id: v1(), title: "Beer", isDone: true}
            ]
        }
    )*/

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const addTask = useCallback( (newTitle: string, todoListID: string) => {
        dispatch(addTaskAC(newTitle, todoListID))
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        let action = removeTaskAC(taskId, todoListID)
        dispatch(action)
    },[dispatch])

    const changeCheckbox = useCallback((taskId: string, value: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, value, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListID))
    }, [dispatch])

    const changeTodoListFilter = useCallback((filterValue: filterValueType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filterValue))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle, id))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback( (title: string) => {
        dispatch(AddTodoListAC(title))
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
            </AppBar>
            <Container fixed style={{padding: "20px 0"}}>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListsComponent}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

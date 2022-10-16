import React, {useReducer} from 'react';
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

export type filterValueType = 'All' | 'Active' | 'Completed';


function AppWithRedux() {
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
    )

    const addTask = (newTitle: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(newTitle, todoListID))
    }

    const removeTask = (taskId: string, todoListID: string) => {
        let action = removeTaskAC(taskId, todoListID)
        dispatchToTasks(action)
    }

    const changeCheckbox = (taskId: string, value: boolean, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, value, todoListID))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todoListID))
    }

    const changeTodoListFilter = (filterValue: filterValueType, todoListID: string) => {
        dispatchToTodoLists(ChangeTodoListFilterAC(todoListID, filterValue))
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        dispatchToTodoLists(ChangeTodoListTitleAC(newTitle, id))
    }

    const removeTodoList = (todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const todoListsComponent = todoLists.map(tl => {
        let filteredTask = tasks[tl.id]
        if (tl.filter === 'Completed') {
            filteredTask = tasks[tl.id].filter(el => el.isDone)
        }
        if (tl.filter === 'Active') {
            filteredTask = tasks[tl.id].filter(el => !el.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: "20px"}}>
                    <Todolist
                        id={tl.id}
                        changeCheckbox={changeCheckbox}
                        title={tl.title}
                        tasks={filteredTask}
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

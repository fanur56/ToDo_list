import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {filterValueType, TodolistDomainType} from "./state/todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'All', addedDate: "", order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'All', addedDate: "", order: 0}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
            [todoListID_1]: [
                {
                    id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, startDate: "", deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID_1
                },
                {
                    id: v1(), title: "JS", status: TaskStatuses.Completed, startDate: "", deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID_1
                },
                {
                    id: v1(), title: "JSX", status: TaskStatuses.Completed, startDate: "", deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID_1
                },
                {
                    id: v1(), title: "ReactJS", status: TaskStatuses.New, startDate: "", deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID_1
                },
                {
                    id: v1(), title: "Rest API", status: TaskStatuses.New, startDate: "", deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID_1
                }
            ],
            [todoListID_2]: [
                {
                    id: v1(), title: "Meat", status: TaskStatuses.Completed, startDate: "", deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID_2
                },
                {
                    id: v1(), title: "IceCream", status: TaskStatuses.New, startDate: "", deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID_2
                },
                {
                    id: v1(), title: "Beer", status: TaskStatuses.Completed, startDate: "", deadline: "",
                    addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID_2
                }
            ]
        }
    )

    const addTask = (newTitle: string, todoListID: string) => {
        const newTask = {
            id: v1(), title: newTitle, status: TaskStatuses.New, startDate: "", deadline: "",
            addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: todoListID
        }
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTasks)
    }

    const removeTask = (taskId: string, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter((el) => el.id !== taskId)
        setTasks(copyTasks)
    }

    const changeCheckbox = (taskId: string, value: TaskStatuses, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(el => el.id === taskId ? {...el, status: value} : el)
        setTasks(copyTasks)
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        setTasks(copyTasks)
    }

    const changeTodoListFilter = (filterValue: filterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filterValue} : tl))
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todolist = todoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodolist: TodolistDomainType = {
            id: newTodoListID,
            title: title,
            filter: 'All',
            addedDate: "",
            order: 0
        }
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }

    const todoListsComponent = todoLists.map(tl => {
        let filteredTask = tasks[tl.id]
        if (tl.filter === 'Completed') {
            filteredTask = tasks[tl.id].filter(el => el.status === TaskStatuses.Completed)
        }
        if (tl.filter === 'Active') {
            filteredTask = tasks[tl.id].filter(el => el.status === TaskStatuses.New)
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

export default App;

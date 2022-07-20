import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type filterValueType = 'All' | 'Active' | 'Completed';

export type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

export type TaskStateType = {
    [todoListID: string]: Array<TasksType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        const newTask = {id: v1(), title: newTitle, isDone: false}
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTasks)
    }

    const removeTask = (taskId: string, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter((el) => el.id !== taskId)
        setTasks(copyTasks)
    }

    const changeCheckbox = (taskId: string, value: boolean, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: value} : el)
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
        const newTodolist: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'All'
        }
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
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

export default App;

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
    ChangeTodoListTitleAC, filterValueType,
    RemoveTodoListAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";

function AppWithReducer() {
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'All', addedDate: "", order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'All', addedDate: "", order: 0}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(addTaskAC(newTitle, todoListID))
    }

    const removeTask = (taskId: string, todoListID: string) => {
        let action = removeTaskAC(taskId, todoListID)
        dispatchToTasks(action)
    }

    const changeCheckbox = (taskId: string, value: TaskStatuses, todoListID: string) => {
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

export default AppWithReducer;

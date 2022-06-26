import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = 'All' | 'Active' | 'Completed';

type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

type TaskStateType = {
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

    const changeTodoListFilter = (filterValue: filterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filterValue} : tl))
    }

    const changeCheckbox = (taskId: string, value: boolean, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: value} : el)
        setTasks(copyTasks)
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
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
            <Todolist
                key={tl.id}
                id={tl.id}
                changeCheckbox={changeCheckbox}
                title={tl.title}
                tasks={filteredTask}
                removeTask={removeTask}
                filter={tl.filter}
                addTask={addTask}
                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })
    return (
        <div className="App">
            {todoListsComponent}
        </div>
    );
}

export default App;

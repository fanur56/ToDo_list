import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = 'All' | 'Active' | 'Completed';

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "JSX", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
    ])

    let [filterValue, setFilterValue] = useState<filterValueType>('All')

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const removeTask = (taskId: string) => {
        tasks = tasks.filter((el) => el.id !== taskId)
        setTasks(tasks)
    }

    const changeFilter = (filterValue: filterValueType) => {
        setFilterValue(filterValue)
    }

    const changeCheckbox = (taskId: string, value: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: value} : el))
    }

    let filteredTask = tasks
    if (filterValue === 'Completed') {
        filteredTask = tasks.filter(el => el.isDone)
    }
    if (filterValue === 'Active') {
        filteredTask = tasks.filter(el => !el.isDone)
    }

    return (
        <div className="App">
            <Todolist
                changeCheckbox={changeCheckbox}
                title={'Some txt'}
                tasks={filteredTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filterValue={filterValue}
            />
        </div>
    );
}

export default App;

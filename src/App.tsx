import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
export type filterValueType = 'All' | 'Active' | 'Completed';
function App() {
    /*let tasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "JSX", isDone: true },
        { id: 4, title: "ReactJS", isDone: false }
    ]*/

    let [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "JSX", isDone: true},
        {id: 4, title: "ReactJS", isDone: false}
    ])

    let [filterValue, setFilterValue] = useState<filterValueType>('All')


    const removeTask = (taskId: number) => {
        tasks = tasks.filter((el) => el.id !== taskId)
        setTasks(tasks)
        console.log(taskId);
    }

    const changeFilter = (filterValue: filterValueType) => {
        setFilterValue(filterValue)
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
                title={'Some txt'}
                tasks={filteredTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

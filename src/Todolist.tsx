import React from "react";
import {filterValueType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask:(id: number)=>void
    changeFilter: (filterValue: filterValueType)=>void

}

export type TasksPropsType = {
    id: number,
    title: string,
    isDone: boolean,
}

export const Todolist = (props: TodolistPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        return (
                            <li>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={() => {props.removeTask(el.id)}}>x</button>
                            </li>

                        )
                    })
                }

            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('All')}}>All</button>
                <button onClick={()=>{props.changeFilter('Active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('Completed')}}>Completed</button>
            </div>
        </div>
    )
}
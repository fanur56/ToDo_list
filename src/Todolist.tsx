import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";
import {Button} from "./Components/Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask:(id: string)=>void
    changeFilter: (filterValue: filterValueType)=>void
    addTask: (newTitle:string)=>void
}

export type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const Todolist = (props: TodolistPropsType) => {
    
    let [newTitle, setNewTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key==='Enter') {
            addTaskHandler()
        }
    }

    /*const allChangeFilterHandler = () => {
        props.changeFilter('All')
    }

    const activeChangeFilterHandler = () => {
        props.changeFilter('Active')
    }

    const completedChangeFilterHandler = () => {
        props.changeFilter('Completed')
    }*/

    const universalChangeFilterHandler = (value:filterValueType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (elID: string) => {
            props.removeTask(elID)
        }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        /*const removeTaskHandler = () => {
                            props.removeTask(el.id)
                        }*/
                        return (
                            <li>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={()=>removeTaskHandler(el.id)}>x</button>
                            </li>

                        )
                    })
                }

            </ul>
            <div>
                {/*<button onClick={allChangeFilterHandler}>All</button>
                <button onClick={activeChangeFilterHandler}>Active</button>
                <button onClick={completedChangeFilterHandler}>Completed</button>*/}
                {/*<button onClick={()=>universalChangeFilterHandler('All')}>All</button>
                <button onClick={()=>universalChangeFilterHandler('Active')}>Active</button>
                <button onClick={()=>universalChangeFilterHandler('Completed')}>Completed</button>*/}
                <Button name={'All'} callBack={()=>universalChangeFilterHandler('All')}/>
                <Button name={'Active'} callBack={()=>universalChangeFilterHandler('Active')}/>
                <Button name={'Completed'} callBack={()=>universalChangeFilterHandler('Completed')}/>
            </div>
        </div>
    )
}
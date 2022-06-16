import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";
import {Button} from "./Components/Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (filterValue: filterValueType) => void
    addTask: (newTitle: string) => void
    changeCheckbox: (elId: string, value: boolean) => void
    filterValue: filterValueType
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,

}

export const Todolist = (props: TodolistPropsType) => {

    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle)
            setNewTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const universalChangeFilterHandler = (value: filterValueType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (elID: string) => {
        props.removeTask(elID)
    }

    const ChangeCheckboxHandler = (elID: string, eventValue: boolean) => {
        props.changeCheckbox(elID, eventValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? "error" : ""} value={newTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        return (
                            <li key={el.id} className={el.isDone ? "isDone" : ""}>
                                <input type="checkbox" checked={el.isDone}
                                       onChange={(event: ChangeEvent<HTMLInputElement>) => ChangeCheckboxHandler(el.id, event.currentTarget.checked)}/>
                                <span>{el.title}</span>
                                <button onClick={() => removeTaskHandler(el.id)}>x</button>
                            </li>

                        )
                    })
                }

            </ul>
            <div>
                <Button filterValue={props.filterValue} name={'All'}
                        callBack={() => universalChangeFilterHandler('All')}/>
                <Button filterValue={props.filterValue} name={'Active'}
                        callBack={() => universalChangeFilterHandler('Active')}/>
                <Button filterValue={props.filterValue} name={'Completed'}
                        callBack={() => universalChangeFilterHandler('Completed')}/>
            </div>
        </div>
    )
}
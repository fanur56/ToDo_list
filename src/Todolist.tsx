import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";
import {Button} from "./Components/Button";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListID: string) => void
    filter: filterValueType
    addTask: (newTitle: string, todoListID: string) => void
    changeCheckbox: (elId: string, value: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filterValue: filterValueType, todoListID: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,

}

export const Todolist = (props: TodolistPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle, props.id)
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
        return () => props.changeTodoListFilter(value, props.id)
    }

    const removeTaskHandler = (elID: string) => {
        props.removeTask(elID, props.id)
    }

    const ChangeCheckboxHandler = (elID: string, eventValue: boolean) => {
        props.changeCheckbox(elID, eventValue, props.id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={() => props.removeTodoList(props.id)}>Del</button>
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
                <Button filter={props.filter} name={'All'}
                        callBack={universalChangeFilterHandler('All')}/>
                <Button filter={props.filter} name={'Active'}
                        callBack={universalChangeFilterHandler('Active')}/>
                <Button filter={props.filter} name={'Completed'}
                        callBack={universalChangeFilterHandler('Completed')}/>
            </div>
        </div>
    )
}
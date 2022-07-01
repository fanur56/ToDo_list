import React, {ChangeEvent} from "react";
import {filterValueType} from "./App";
import {Button} from "./Components/Button";
import {AddItemForm} from "./Components/AddItemForm"
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (id: string, newValue: string, todoListID: string) => void
    changeTodoListTitle: (id: string, newValue: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,

}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
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

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle (props.id, newTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <button onClick={() => props.removeTodoList(props.id)}>Del</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((el) => {
                        const onchangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle (el.id, newValue, props.id)
                        }
                        return (
                            <li key={el.id} className={el.isDone ? "isDone" : ""}>
                                <input type="checkbox" checked={el.isDone}
                                       onChange={(event: ChangeEvent<HTMLInputElement>) => ChangeCheckboxHandler(el.id, event.currentTarget.checked)}/>
                                <EditableSpan title={el.title}
                                              onChange={onchangeTitleHandler}/>
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
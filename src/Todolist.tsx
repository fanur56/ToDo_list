import React, {ChangeEvent} from "react";
import {filterValueType} from "./App";
import {FilterButton} from "./Components/FilterButton";
import {AddItemForm} from "./Components/AddItemForm"
import {EditableSpan} from "./EditableSpan";
import {IconButton, Checkbox, ListItem, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

    const TaskStatus = (elID: string, eventValue: boolean) => {
        props.changeCheckbox(elID, eventValue, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              onChange={changeTodoListTitle}/>
                <IconButton size={"small"} onClick={removeTodoListHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List component={"ul"}>
                {
                    props.tasks.map((el) => {
                        const onchangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(el.id, newValue, props.id)
                        }

                        const ChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            TaskStatus(el.id, event.currentTarget.checked)
                        }

                        return (
                            <ListItem key={el.id}
                                      dense
                                      divider
                                      className={el.isDone ? "isDone" : ""}>
                                <Checkbox color={"primary"}
                                          size={"small"}
                                          checked={el.isDone}
                                          onChange={ChangeCheckboxHandler}/>
                                <EditableSpan title={el.title}
                                              onChange={onchangeTitleHandler}/>
                                <IconButton size={"small"} onClick={() => removeTaskHandler(el.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>

                        )
                    })
                }

            </List>
            <div>
                <FilterButton filter={props.filter} name={'All'}
                              callBack={universalChangeFilterHandler('All')}/>
                <FilterButton filter={props.filter} name={'Active'}
                              callBack={universalChangeFilterHandler('Active')}/>
                <FilterButton filter={props.filter} name={'Completed'}
                              callBack={universalChangeFilterHandler('Completed')}/>
            </div>
        </div>
    )
}
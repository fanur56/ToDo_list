import React, {ChangeEvent, useCallback} from "react";
import {filterValueType} from "./App";
import {FilterButton} from "./Components/FilterButton";
import {AddItemForm} from "./Components/AddItemForm"
import {EditableSpan} from "./EditableSpan";
import {IconButton, Checkbox, ListItem, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Components/Task";

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

export const Todolist = React.memo(({addTask, ...props}: TodolistPropsType) => {

    const addTaskWithCallback = useCallback((title: string) => {
        addTask(title, props.id)
    }, [addTask, props.id])

    const universalChangeFilterHandler = (value: filterValueType) => {
        return () => props.changeTodoListFilter(value, props.id)
    }

    const removeTask = useCallback((elID: string) => {
        props.removeTask(elID, props.id)
    }, [props.removeTask, props.id])

    const TaskStatus = useCallback ((elID: string, eventValue: boolean) => {
        props.changeCheckbox(elID, eventValue, props.id)
    }, [props.changeCheckbox, props.id])

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id)
    }, [props.changeTaskTitle, props.id])

    let filteredTask = props.tasks
    if (props.filter === 'Completed') {
        filteredTask = props.tasks.filter(el => el.isDone)
    }
    if (props.filter === 'Active') {
        filteredTask = props.tasks.filter(el => !el.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              onChange={changeTodoListTitle}/>
                <IconButton size={"small"} onClick={removeTodoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskWithCallback}/>
            <List component={"ul"}>
                {
                    filteredTask.map((el) => {
                        return <Task task={el}
                                     removeTask={removeTask}
                                     changeTaskTitle={changeTaskTitle}
                                     changeCheckbox={TaskStatus}
                                     key={el.id}/>
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
})
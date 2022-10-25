import {TasksType} from "../Todolist";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent} from "react";

export type TaskPropsType = {
    task: TasksType
    removeTask: (id: string) => void
    changeTaskTitle: (id: string, newValue: string) => void
    changeCheckbox: (elId: string, value: boolean) => void
}

export const Task = React.memo( ({
        task,
        removeTask,
        changeTaskTitle,
        changeCheckbox,
    }: TaskPropsType) => {

    const removeTaskHandler = () => removeTask(task.id)

    const onchangeTitleHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue)
    }

    const ChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeCheckbox(task.id, event.currentTarget.checked)
    }

    console.log("Task")

    return (
        <ListItem dense
                  divider
                  className={task.isDone ? "isDone" : ""}>
            <Checkbox color={"primary"}
                      size={"small"}
                      checked={task.isDone}
                      onChange={ChangeCheckboxHandler}/>
            <EditableSpan title={task.title}
                          onChange={onchangeTitleHandler}/>
            <IconButton size={"small"} onClick={removeTaskHandler}>
                <Delete />
            </IconButton>
        </ListItem>

    )
})
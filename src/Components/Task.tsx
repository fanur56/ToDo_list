import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "../api/todolists-api";

export type TaskPropsType = {
    task: TaskType
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

    const onchangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue)
    }, [changeTaskTitle, task.id])

    const ChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeCheckbox(task.id, event.currentTarget.checked)
    }


    return (
        <ListItem dense
                  divider
                  className={task.status === TaskStatuses.Completed ? "isDone" : ""}>
            <Checkbox color={"primary"}
                      size={"small"}
                      checked={task.status === TaskStatuses.Completed}
                      onChange={ChangeCheckboxHandler}/>
            <EditableSpan title={task.title}
                          onChange={onchangeTitleHandler}/>
            <IconButton size={"small"} onClick={removeTaskHandler}>
                <Delete />
            </IconButton>
        </ListItem>

    )
})
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type addItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: addItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle)
            setNewTitle('')
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       size={"small"}
                       label={"Title"}
                       value={newTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       helperText={!!error && "Title is required"}
                       disabled={props.disabled}/>
            <IconButton onClick={addTaskHandler} disabled={props.disabled} color={"primary"}>
                <Add/>
            </IconButton>
        </div>
    )
})
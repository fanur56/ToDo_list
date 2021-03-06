import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (title:string)=>void
}

export const AddItemForm: React.FC<addItemFormPropsType> = ({addItem}) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addItem(newTitle)
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
                       helperText={!!error && "Title is required"}/>
            <IconButton onClick={addTaskHandler}>
                <Add />
            </IconButton>
        </div>
    )
}
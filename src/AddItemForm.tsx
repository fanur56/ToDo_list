import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input className={error ? "error" : ""}
                   value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
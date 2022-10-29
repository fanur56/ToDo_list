import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}

export const EditableSpan = memo( (props: EditableSpanPropsType) => {
    console.log("EditableSpan")
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const editModeOnHandler = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const editModeOffHandler = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>)=> setTitle(e.currentTarget.value)


    return (
        editMode
            ? <TextField value={title}
                         onBlur={editModeOffHandler}
                         onChange={onChangeTitleHandler}
                         autoFocus
            color={"primary"}/>
            : <span onDoubleClick={editModeOnHandler}>{props.title}</span>
    )
});

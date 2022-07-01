import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
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
            ? <input onBlur={editModeOffHandler}
                     value={title}
                     onChange={onChangeTitleHandler}
                     autoFocus />
            : <span onDoubleClick={editModeOnHandler}>{props.title}</span>
    )
};

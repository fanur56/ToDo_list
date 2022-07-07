import React from "react";
import {filterValueType} from "../App";
import {Button} from "@material-ui/core";
import s from "./FilterButton.module.css"

type ButtonPropsType = {
    name: string
    callBack: () => void
    filter: filterValueType
}

export const FilterButton = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <div className={s.buttons}>
            <Button
                variant={props.filter === props.name ? "contained" : "outlined"}
                size={"small"}
                color={"primary"}
                className={props.filter === props.name ? "active-filter" : ""}
                onClick={onClickHandler}>{props.name}
            </Button>
        </div>
    )
}
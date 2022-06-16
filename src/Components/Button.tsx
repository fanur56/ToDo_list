import React from "react";
import {filterValueType} from "../App";

type ButtonPropsType = {
    name:string
    callBack:()=>void
    filterValue:filterValueType
}

export const Button = (props:ButtonPropsType)=> {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <div>
            <button className={props.filterValue===props.name ? "active-filter" : ""} onClick={onClickHandler}>{props.name}</button>
        </div>
    )
}
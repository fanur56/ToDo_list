import React from "react";
import {filterValueType} from "../App";

type ButtonPropsType = {
    name:string
    callBack:()=>void
    filter:filterValueType
}

export const Button = (props:ButtonPropsType)=> {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <div>
            <button className={props.filter===props.name ? "active-filter" : ""} onClick={onClickHandler}>{props.name}</button>
        </div>
    )
}
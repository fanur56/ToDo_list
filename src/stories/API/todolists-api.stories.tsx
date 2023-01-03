import React, {useEffect, useState} from "react";
import axios from "axios";

export default {
    title: "API"
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "5681cc7e-1c04-4d08-8e39-18a3f5b202e6"
    }
});

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        instance.get("todo-lists")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        instance.post("todo-lists", {title: "List"})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
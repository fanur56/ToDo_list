import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../../api/todolists-api";

export default {
    title: "API"
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.createTodolist("Technologies")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = ()=> {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.deleteTodolist("f435ffc5-8225-4552-a847-afdc74e45a41")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.updateTodolist("d6373953-3948-4366-808f-ed2e1a8932b8", "Yo")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTasks("b9c1ef87-6947-4a66-9127-178ea41229b6")
            .then((res) => {
                setState(res.data.items)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = ()=> {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.deleteTask("d6373953-3948-4366-808f-ed2e1a8932b8", "58fd9050-2d59-43f2-86d5-a7d1cd312a18")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.createTask("b9c1ef87-6947-4a66-9127-178ea41229b6", "1234")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.updateTask("d6373953-3948-4366-808f-ed2e1a8932b8", "58fd9050-2d59-43f2-86d5-a7d1cd312a18", {
            title: "Milk",
            description: "Bye a milk",
            status: 0,
            priority: 1,
            startDate: "",
            deadline: ""
        })
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setErrorAC, setStatusAC} from "./app-reducer";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    newTitle: string
    id: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: filterValueType
}

type changeEntityStatusAT = {
    type: "CHANGE_ENTITY_STATUS",
    id: string
}

export type setTodolistAT = ReturnType<typeof setTodolists>

type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | setTodolistAT
    | AppActionsType
    | changeEntityStatusAT

export type filterValueType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {
    filter: filterValueType
    entityStatus: RequestStatusType
}
const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todoLists = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS":
            return action.todos.map(el => ({...el, filter: "All", entityStatus: "idle"}))
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [
                {
                    id: action.todoListID,
                    title: action.title,
                    filter: 'All',
                    order: 0,
                    addedDate: "",
                    entityStatus: "idle"
                },
                ...todoLists,
            ]
        case "CHANGE-TODOLIST-TITLE":
            const todolist = todoLists.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.newTitle
            }
            return [...todoLists]
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE_ENTITY_STATUS":
            const todolistForChangeEntityStatus = todoLists.find(tl => tl.id === action.id)
            return {

            }
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    id
})

export const AddTodoListAC = (title: string, id: string): AddTodoListAT => ({
    type: "ADD-TODOLIST",
    title,
    todoListID: id
})

export const ChangeTodoListTitleAC = (newTitle: string, id: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    newTitle,
    id
})

export const ChangeTodoListFilterAC = (id: string, filter: filterValueType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
})

export const changeEntityStatusAC = (id: string) => ({
    type: "CHANGE_ENTITY_STATUS",
    id
})

export const setTodolists = (todos: TodolistType[]) => {
    return {
        type: "SET-TODOS",
        todos
    } as const
}

export const getTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.getTodolists()
        .then((response) => {
            dispatch(setTodolists(response.data))
            dispatch(setStatusAC("succeeded"))
        })
}

export const deleteTodolistTC = (todoListID: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.deleteTodolist(todoListID)
        .then(() => {
            dispatch(RemoveTodoListAC(todoListID))
            dispatch(setStatusAC("succeeded"))
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.createTodolist(title)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(AddTodoListAC(response.data.data.item.title, response.data.data.item.id))
                dispatch(setStatusAC("succeeded"))
            } else {
                if (response.data.messages.length) {
                    dispatch(setErrorAC(response.data.messages[0]))
                } else {
                    dispatch(setErrorAC("Some error"))
                }
                dispatch(setStatusAC("failed"))
            }
        })

}

export const ChangeTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.updateTodolist(title, id)
        .then(() => {
            dispatch(ChangeTodoListTitleAC(title, id))
            dispatch(setStatusAC("succeeded"))
        })
}

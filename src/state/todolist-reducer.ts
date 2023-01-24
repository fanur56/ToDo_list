import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, setStatusAC} from "./app-reducer";

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

export type setTodolistAT = ReturnType<typeof setTodolists>

type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | setTodolistAT
| AppActionsType

export type filterValueType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {
    filter: filterValueType
}
const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todoLists = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS":
            return action.todos.map(el => ({...el, filter: "All"}))
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [
                {
                    id: action.todoListID,
                    title: action.title,
                    filter: 'All',
                    order: 0,
                    addedDate: ""
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
    todolistsAPI.deleteTodolist(todoListID)
        .then(() => {
            dispatch(RemoveTodoListAC(todoListID))
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTodolist(title)
        .then((response) => {
            dispatch(AddTodoListAC(response.data.data.item.title, response.data.data.item.id))
        })

}

export const ChangeTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolist(title, id)
        .then(() => {
            dispatch(ChangeTodoListTitleAC(title, id))
        })
}

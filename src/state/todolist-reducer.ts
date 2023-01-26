import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setErrorAC, setStatusAC} from "./app-reducer";

export type setTodolistAT = ReturnType<typeof setTodolists>
export type AddTodoListAT = ReturnType<typeof AddTodoListAC>
export type RemoveTodoListAT = ReturnType<typeof RemoveTodoListAC>

type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | ReturnType<typeof changeEntityStatusAC>
    | ReturnType<typeof ChangeTodoListTitleAC>
    | setTodolistAT
    | AppActionsType

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
            return todoLists.map(tl=>tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string) => ({
    type: "REMOVE-TODOLIST",
    id
} as const)

export const AddTodoListAC = (title: string, id: string) => ({
    type: "ADD-TODOLIST",
    title,
    todoListID: id
} as const)

export const ChangeTodoListTitleAC = (newTitle: string, id: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    newTitle,
    id
} as const)

export const ChangeTodoListFilterAC = (id: string, filter: filterValueType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
} as const)

export const changeEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE_ENTITY_STATUS",
    id,
    entityStatus
} as const)

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
    dispatch(changeEntityStatusAC(todoListID, "loading"))
    todolistsAPI.deleteTodolist(todoListID)
        .then(() => {
            dispatch(RemoveTodoListAC(todoListID))
            dispatch(setStatusAC("succeeded"))
        })
        .catch((error)=>{
            dispatch(setStatusAC("failed"))
            dispatch(changeEntityStatusAC(todoListID, "failed"))
            dispatch(setErrorAC(error.message))
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

import {filterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    id: string
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

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            return [...todoLists, {id: action.id, title: action.title, filter: 'All'}]
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
    id
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
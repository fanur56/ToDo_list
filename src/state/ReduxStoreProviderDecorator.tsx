import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./task-reducer";
import {todolistsReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    appStatus: appReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistID_1", title: "What to learn", filter: "All", addedDate: "", order: 0},
        {id: "todolistID_2", title: "What to buy", filter: "All", addedDate: "", order: 0}
    ],
    tasks: {
        ["todolistID_1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistID_1"
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistID_1"
            },
            {
                id: v1(), title: "JSX", status: TaskStatuses.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistID_1"
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistID_1"
            },
            {
                id: v1(), title: "Rest API", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistID_1"
            }
        ],
        ["todolistID_2"]: [
            {
                id: v1(), title: "Meat", status: TaskStatuses.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistID_2"
            },
            {
                id: v1(), title: "IceCream", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistID_2"
            },
            {
                id: v1(), title: "Beer", status: TaskStatuses.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistID_2"
            }
        ]
    },
    appStatus: {status: "idle"}
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
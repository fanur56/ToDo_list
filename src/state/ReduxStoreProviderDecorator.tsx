import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./task-reducer";
import {todolistsReducer} from "./todolist-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistID_1", title: "What to learn", filter: "All"},
        {id: "todolistID_2", title: "What to buy", filter: "All"}
    ],
    tasks: {
        ["todolistID_1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "JSX", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false}
        ],
        ["todolistID_2"]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "IceCream", isDone: false},
            {id: v1(), title: "Beer", isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
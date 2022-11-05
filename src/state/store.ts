import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./task-reducer";
import {todolistsReducer} from "./todolist-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
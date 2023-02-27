import {TaskStateType} from "../App";
import {AddTodoListAT, RemoveTodoListAT, setTodolistAT} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {AppActionsType, setStatusAC} from "./app-reducer";
import {HandleNetworkServerError, HandleServerAppError} from "../utils/error-utils";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleAT = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>

export type ActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskAT
    | ChangeTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | setTodolistAT
    | SetTasksActionType
    | AppActionsType

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        case "SET-TODOS":
            const copyStateForSetTodos = {...state}
            action.todos.forEach(tl => {
                copyStateForSetTodos[tl.id] = []
            })
            return copyStateForSetTodos
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskID ? {
                    ...t,
                    status: action.value
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListID]: []
            }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            //throw new Error("I don't understand this type")
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskID, todolistId} as const
}

export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

export const changeTaskStatusAC = (taskID: string, value: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, value, todolistId} as const
}

export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskID, newTitle, todolistId} as const
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: "SET-TASKS", tasks, todolistId} as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.getTasks(todolistId)
        .then((response) => {
            dispatch(setTasksAC(response.data.items, todolistId))
            dispatch(setStatusAC("succeeded"))
        })
        .catch((error) => HandleNetworkServerError(dispatch, error))
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setStatusAC("succeeded"))
            } else {
                HandleServerAppError(dispatch, response.data)
            }
        })
        .catch((error) => HandleNetworkServerError(dispatch, error))
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.createTask(todolistId, title)
        .then((response) => {
            if (response.data.resultCode === 0) {
                const item = response.data.data.item
                dispatch(addTaskAC(item))
                dispatch(setStatusAC("succeeded"))
            } else {
                HandleServerAppError<TaskType>(dispatch, response.data)
            }
        })
        .catch((error) => HandleNetworkServerError(dispatch, error))
}

export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        const tasks = getState().tasks
        const task = tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                status
            }

            dispatch(setStatusAC("loading"))

            todolistsAPI.updateTask(todolistId, taskId, model)
                .then(() => {
                    dispatch(changeTaskStatusAC(taskId, status, todolistId))
                    dispatch(setStatusAC("succeeded"))
                })
                .catch((error) => HandleNetworkServerError(dispatch, error))
        }
    }

export const changeTaskTitleTC = (taskId: string, newTitle: string, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        const tasks = getState().tasks
        const task = tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            const model: UpdateTaskModelType = {
                title: newTitle,
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status
            }

            dispatch(setStatusAC("loading"))

            todolistsAPI.updateTask(todolistId, taskId, model)
                .then(() => {
                    dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
                    dispatch(setStatusAC("succeeded"))
                })
                .catch((error) => HandleNetworkServerError(dispatch, error))
        }
    }



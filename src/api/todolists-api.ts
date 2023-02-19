import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "5681cc7e-1c04-4d08-8e39-18a3f5b202e6"
    }
});

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTaskResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: {
        item: D
    }
}

export type AuthResponseType = {
    resultCode: number
    messages: string[],
    data: {
        userId: number
    }
}

export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type UserType = {
    id: string
    email: string
    login: string
}

export const authAPI = {
    login(data: LoginType) {
        return instance.post<LoginType, AxiosResponse<AuthResponseType>>("auth/login", data)
    },
    logOut() {
        return instance.delete<ResponseType>("auth/login")
    },
    me() {
        return instance.get<ResponseType<UserType>>("auth/me")
    }
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<TodolistType>>("todo-lists", {title: title})
    },
    deleteTodolist(todoListID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}`)
    },
    updateTodolist(title: string, id: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}
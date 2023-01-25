export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "loading" as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "APP/SET_ERROR":
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({
    type: "APP/SET_STATUS",
    status
} as const)

export const setErrorAC = (error: null | string) => ({
    type: "APP/SET_ERROR",
    error
} as const)

export type AppActionsType = ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorAC>
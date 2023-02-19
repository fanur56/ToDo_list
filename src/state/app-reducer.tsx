export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    isInitialized: false,
    status: "idle" as RequestStatusType,
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
        case "APP/SET_IS_INITIALIZED":
            return {
                ...state,
                isInitialized: action.isInitialized
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

export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: "APP/SET_IS_INITIALIZED",
    isInitialized
} as const)

export type AppActionsType = ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorAC> | ReturnType<typeof setIsInitializedAC>
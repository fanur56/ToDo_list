export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "loading" as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({
    type: "APP/SET_STATUS",
    status
} as const)

export type AppActionsType = ReturnType<typeof setStatusAC>
import { DISPLAY_LOADING, HIDE_LOADING } from "../Const/LoadingConst"

export const displayLoading = () => {
    return {
        type: DISPLAY_LOADING,
    }
}
export const hideLoading = () => {
    return {
        type: HIDE_LOADING,
    }
}
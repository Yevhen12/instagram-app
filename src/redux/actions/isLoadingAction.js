import { ActionType } from '../constants/action_type'

export const setIsLoading = (loading) => {
    return {
        type: ActionType.SET_IS_LOADING,
        payload: loading
    }
}

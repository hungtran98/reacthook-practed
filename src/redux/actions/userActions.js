export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'


export const handleLogin = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_USER_LOGIN})
    }
}

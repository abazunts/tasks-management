import tasksAPI from "../dal/taskAPI";

const SET_ERROR = 'TASKS/LOGIN/SET_ERROR';
const SET_TOKEN = 'TASKS/LOGIN/SET_TOKEN';
const SET_IS_AUTH_MESSAGE = 'TASKS/LOGIN/SET_IS_AUTH_MESSAGE';

const initState = {
    errorMessage: null,
    token: null,
    isAuthMessage: 'Для редактирования задачи требуется пройти авторизацию'
};


const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.error
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case SET_IS_AUTH_MESSAGE:
            return {
                ...state,
                isAuthMessage: action.message
            };
        default:
            return state
    }
};

const setError = (error) => ({type: SET_ERROR, error});
const setToken = (token) => ({type: SET_TOKEN, token});
const setIsAuthMessage = (message) => ({type: SET_IS_AUTH_MESSAGE, message});

export const login = (value) => async (dispatch) => {
    let data = await tasksAPI.logIn(value);
debugger
    if (data.status === 'error') {
        dispatch(setError(data.message.password))
    } else {
        dispatch(setError(null));
        dispatch(setToken(data.message.token));
        dispatch(setIsAuthMessage(''));
        window.localStorage.setItem('token', data.message.token);
    }
};

export const isAuth = () => async (dispatch) => {
    dispatch(setToken(window.localStorage.getItem('token')));
    dispatch(setIsAuthMessage(''));
};

export const logOut = () => (dispatch) => {
    dispatch(setToken(null));
    dispatch(setToken(window.localStorage.setItem('token', '')));
    dispatch(setIsAuthMessage('Для редактирования задачи требуется пройти авторизацию'));
};

export default loginReducer;
import {taskTitle} from "../dal/TaskModel";
import {reset} from "redux-form"
import tasksAPI from "../dal/taskAPI";
import {logOut} from "./loginReducer";

const ADD_TASK = 'TASKS/MANAGEMENT/ADD_TASK';
const SET_TASKS = 'TASKS/MANAGEMENT/SET_TASKS';
const NEW_TASK = 'TASKS/MANAGEMENT/NEW_TASK';
const SET_CURRENT_PAGE = 'TASKS/MANAGEMENT/SET_CURRENT_PAGE';
const SET_SORT_FIELD = 'TASKS/MANAGEMENT/SET_SORT_FIELD';
const SET_DIRECTION = 'TASKS/MANAGEMENT/SET_DIRECTION';
const SET_CHANGE_TEXT = 'TASKS/MANAGEMENT/SET_CHANGE_TEXT';
const SET_CHANGE_STATUS = 'TASKS/MANAGEMENT/SET_CHANGE_STATUS';

const initState = {
    taskTitle: taskTitle,
    tasks: [],
    total_task_count: 0,
    newTask: null,
    editMode: false,
    messageSuccess: null,
    pages: [],
    currentPage: 1,
    sort_field: 'id',
    sort_direction: 'asc',
    direction: "/\\",

};

const tasksReduser = (state = initState, action) => {
    switch (action.type) {
        case NEW_TASK:
            return {
                ...state,
                newTask: action.task
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            };
        case SET_TASKS:
            return {
                ...state,
                tasks: action.tasks,
                total_task_count: action.total_task_count
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_DIRECTION:
            return {
                ...state,
                sort_direction: state.sort_direction === 'asc' ? 'desc' : 'asc',
                direction: state.direction === '/\\' ? '\\/' : '/\\',
            };
        case SET_SORT_FIELD:
            return {
                ...state,
                sort_field: action.filed[0]
            };
        case SET_CHANGE_TEXT:
            let newTasks = [...state.tasks];
            for (let i = 0; i < newTasks.length; i++) {
                if (newTasks[i].id == action.id) {
                    newTasks[i].text = action.value
                }
            }
            return {
                ...state,
                tasks: newTasks
            };
        case SET_CHANGE_STATUS: {
            let newTasks = [...state.tasks];
            for (let i = 0; i < newTasks.length; i++) {
                if (newTasks[i].id == action.id) {
                    newTasks[i].status = action.value
                }
            }
            return {
                ...state,
                tasks: newTasks
            };
        }
        default:
            return state
    }
};

const setTask = (task) => ({type: ADD_TASK, task});
const setTasks = (tasks, total_task_count) => ({type: SET_TASKS, tasks, total_task_count});
const setNewTask = (task) => ({type: NEW_TASK, task});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
const setSortField = (filed) => ({type: SET_SORT_FIELD, filed});
const setSortDirection = () => ({type: SET_DIRECTION});
const changeText = (id, value) => ({type: SET_CHANGE_TEXT, id, value});
const changeStatus = (id, value) => ({type: SET_CHANGE_STATUS, id, value});

export const addTask = (task) => async (dispatch) => {
    if (task) {
        let data = await tasksAPI.addTask(task);
        if (data.status === 'ok') {
            alert('Задача успешно добавлена');
            dispatch(setTask(data.message));
            dispatch(getTasksAll());
            dispatch(setNewTask(null));
            dispatch(reset('new-task'))
        } else {
            console.log(data.message)
        }
    } else {
        dispatch(setNewTask({
            username: '',
            email: '',
            text: ''
        }))
    }
};

export const getTasksAll = () => async (dispatch, getState) => {
    const currentPage = getState().tasksPage.currentPage;
    const sort_field = getState().tasksPage.sort_field;
    const sort_direction = getState().tasksPage.sort_direction;
    let data = await tasksAPI.getTasks(currentPage, sort_field, sort_direction);
    if (data.status === 'ok') {
        let {tasks, total_task_count} = data.message;
        dispatch(setTasks(tasks, total_task_count))
    } else {
        console.log(data.message)
    }
};

export const setSortSettings = (field) => (dispatch) => {
    dispatch(setSortField(field));
    dispatch(setSortDirection());
};

export const saveStatus = (id, value) => async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (token !== '') {
        dispatch(changeStatus(id, value));
        await tasksAPI.editTask({token, status: value, id});
    } else dispatch(logOut())
};

export const saveText = (id, value) => async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (token !== '') {
        dispatch(changeText(id, value));
        await tasksAPI.editTask({token, text: value, id});
    }else dispatch(logOut())
};


export default tasksReduser
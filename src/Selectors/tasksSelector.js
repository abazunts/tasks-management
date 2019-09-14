import {createSelector} from "reselect";

const getEditMode = state => state.tasksPage.editMode;
const getStatus = state => state.tasksPage.status;
const getNewTask = state => state.tasksPage.newTask;
const getCurrentPage = state => state.tasksPage.currentPage;
const getSortField = state => state.tasksPage.sort_field;
const getDirection = state => state.tasksPage.direction;
const getSortDirection = state => state.tasksPage.sort_direction;
const getIsAuthMessage = state => state.tasksPage.isAuthMessage;

export const getTasks = state => {
    const tasks = state.tasksPage.tasks;
    if (tasks.length) {
        return Object.keys(tasks).map(key => ({
            id: tasks[key].id,
            username: tasks[key].username,
            email: tasks[key].email,
            text: tasks[key].text,
            status: tasks[key].status,
        }))
    } else return tasks
};

export const getTasksTitle = state => {
    const taskTitle = state.tasksPage.taskTitle;
    return Object.keys(taskTitle).map(key => ({[key]: taskTitle[key]}));
};

export const getPages = state => {
    const total_task_count = state.tasksPage.total_task_count;
    let pageCount = Math.ceil(total_task_count / 3);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return pages;
};


export const editModeSelector = createSelector(getEditMode, editMode => editMode);
export const statusSelector = createSelector(getStatus, status => status);
export const newTaskSelector = createSelector(getNewTask, newTask => newTask);
export const currentPageSelector = createSelector(getCurrentPage, currentPage => currentPage);
export const sortFieldSelector = createSelector(getSortField, sort_field => sort_field);
export const directionSelector = createSelector(getDirection, direction => direction);
export const sortDirectionSelector = createSelector(getSortDirection, sort_direction => sort_direction);
export const isAuthMessageSelector = createSelector(getIsAuthMessage, isAuthMessage => isAuthMessage);
export const tasksSelector = createSelector(getTasks, (tasks) => tasks);
export const tasksTitleSelector = createSelector(getTasksTitle,(taskTitle) => taskTitle);
export const pagesSelector = createSelector(getPages,(pages) => pages);


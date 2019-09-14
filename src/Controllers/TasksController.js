import {connect} from "react-redux";
import TasksList from "../ui/TasksList";
import React from "react";
import {
    currentPageSelector, directionSelector,
    editModeSelector,
    isAuthMessageSelector, newTaskSelector,
    pagesSelector, sortDirectionSelector, sortFieldSelector, statusSelector,
    tasksSelector,
    tasksTitleSelector
} from "../Selectors/tasksSelector";
import {
    addTask,
    getTasksAll, saveStatus, saveText,
    setCurrentPage,
    setSortSettings
} from "../bll/tasksReducer";
import {tokenSelector} from "../Selectors/loginSelectors";


const TasksController = (props) => {
    React.useEffect(() => {
        props.getTasksAll()
    }, [props.currentPage, props.sort_field, props.sort_direction]);

    const addTask = () => {
        props.addTask()
    };

    const onSubmit = (value) => {
        props.addTask(value);

    };
    return <TasksList {...props} addTask={addTask} onSubmit={onSubmit}/>
};

const mapState = (state) => {
    return {
        tasks: tasksSelector(state),
        taskTitle: tasksTitleSelector(state),
        editMode: editModeSelector(state),
        status: statusSelector(state),
        newTask: newTaskSelector(state),
        pages: pagesSelector(state),
        currentPage: currentPageSelector(state),
        sort_field: sortFieldSelector(state),
        direction: directionSelector(state),
        sort_direction: sortDirectionSelector(state),
        token: tokenSelector(state),
        isAuthMessage: isAuthMessageSelector(state),
    }
};


export default connect(mapState, {
    addTask,
    getTasksAll,
    setCurrentPage,
    setSortSettings,
    saveText,
    saveStatus
})(TasksController);
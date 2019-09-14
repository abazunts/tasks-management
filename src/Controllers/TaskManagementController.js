import {connect} from "react-redux";
import React from "react";
import TasksManagement from "../ui/TasksManagement";
import {isAuth, logOut} from "../bll/loginReducer";
import {errorMessageSelector, tokenSelector} from "../Selectors/loginSelectors";



const TaskManagementController = (props) => {
    React.useEffect(() => {
        props.isAuth()
    }, []);

    const logOut = () => {
        props.logOut();
    };
    return <TasksManagement {...props} logOut={logOut} />
};

const mapState = (state) => {
    return {
        token: tokenSelector(state),
        errorMessage: errorMessageSelector(state),
    }
};

export default  connect(mapState, {logOut, isAuth})(TaskManagementController);
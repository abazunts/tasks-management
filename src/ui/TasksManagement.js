import React from 'react';
import injectSheet from "react-jss";
import {NavLink, Route} from "react-router-dom";
import LoginController from "../Controllers/LoginControler";
import TasksController from "../Controllers/TasksController";

const TasksManagement = (props) => {
    const {classes} = props;
    return (
        <div className={classes.wrapperContent}>
            <div className={classes.navbar}>
                <NavLink to="/login" className={classes.title}>Войти</NavLink>
                <NavLink to="/">Главная</NavLink>
                <Route path='/login' render={() => <LoginController/>}/>
                <Route exact path='/' render={() => <div className={classes.content}>
                    {props.token && <button onClick={props.logOut}>LogOut</button>}
                    <TasksController/>
                </div>}/>
            </div>
        </div>
    );
}

let styles = {
    wrapperContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        width: '50%'
    },
    navbar: {
        margin: '10px'
    },
    title: {
        margin: '10px'
    }

};

export default injectSheet(styles)(TasksManagement);
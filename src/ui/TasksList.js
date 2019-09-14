import React from 'react';
import injectSheet from "react-jss";
import NewTaskForm from "./NewTaskForm";
import {reduxForm} from "redux-form";
import Pagination from "./Pagination";


const TasksList = (props) => {
    const {tasks, taskTitle, classes, newTask, addTask, pages, currentPage, setCurrentPage, setSortSettings, sort_field, direction, token, isAuthMessage} = props;


    const editStatus = (event) => {
        let id = event.target.dataset.id;
        let value = event.currentTarget.checked ? 10 : 0;
        props.saveStatus(id, value);
    };


    const saveText = (event) => {
        let id = event.target.dataset.id;
        let value = event.currentTarget.value;
        props.saveText(id, value);
    };


    return <div>
        <span className={classes.error}>{isAuthMessage && isAuthMessage}</span>
        <div>
            <button onClick={addTask}>Добавить задачу</button>
        </div>
        <form onSubmit={props.handleSubmit}>
            <div className={classes.wrapperContent}>
                {taskTitle.map(title => <span key={Object.keys(title)}
                                              onClick={() => setSortSettings(Object.keys(title))}
                                              className={classes.title}>{Object.values(title)}<span>{String(Object.keys(title)) === sort_field && direction}</span></span>)}
                {!token ? tasks.map(task =>
                        Object.keys(task).map((key, index) => (task[key] === 10 ?
                            <span key={index}>Выполнено</span> : task[key] === 0 ? <span key={index}>Не выполнено</span> :
                                <div key={index} className={classes.content}>{task[key]}</div>))
                    ) :
                    tasks.map(task =>
                        Object.keys(task).map((key, index) => (task[key] === 10 || task[key] === 0 ?
                            <input key={index} data-id={task.id} type={'checkbox'} checked={task[key]}
                                   onChange={editStatus}/> : key === 'text' ?
                                <input key={index} data-id={task.id} type={'text'} value={task[key]}
                                       onChange={saveText}/> :
                                <span key={index} className={classes.content}>{task[key]}</span>)
                        ))
                }

                {newTask && <NewTaskForm/>}
            </div>
        </form>
        <div className={classes.pagination}>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    </div>
};


let styles = {
    wrapperContent: (props) => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${props.taskTitle.length}, 1fr)`,
    }),

    title: {
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        paddingLeft: '3px',
        marginRight: '2px',
        backgroundColor: '#90e2ff',
    },

    content: {
        fontSize: '14px',
        margin: '5px',
        borderBottom: '1px solid #9A9C99'
    },
    pagination: {
        textAlign: "center"
    },
    error: {
        color: "red"
    }
};

export default reduxForm({form: 'new-task'})(injectSheet(styles)(TasksList));


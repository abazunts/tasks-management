import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import tasksReduser from "./tasksReducer";
import {reducer as formReducer} from 'redux-form'
import loginReducer from "./loginReducer";

const reducers = combineReducers({
    tasksPage: tasksReduser,
    login: loginReducer,
    form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;

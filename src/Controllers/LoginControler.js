import {connect} from "react-redux";
import React from "react";
import Login from "../ui/Login";
import {login, logOut} from "../bll/loginReducer";
import {errorMessageSelector, tokenSelector} from "../Selectors/loginSelectors";

const LoginController = (props) => {
    const onSubmit = (value) => {
        props.login(value);
    };
    return <Login {...props}  onSubmit={onSubmit} logOut={logOut}/>
};

const mapState = (state) => {
    return {
        token: tokenSelector(state),
        errorMessage: errorMessageSelector(state),
    }
};

export default  connect(mapState, {login, logOut})(LoginController);
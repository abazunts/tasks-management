import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";


const Login = (props) => {
    return <>
        {props.token && <Redirect to={'/'}/>}
        <form onSubmit={props.handleSubmit}>
            {props.errorMessage && props.errorMessage}
            <Field component={Input} type={'text'} name={'username'} validate={[fieldRequired]}/>
            <Field component={Input} type={'password'} name={'password'} validate={[fieldRequired]}/>
            <button type='submit'>LogIn</button>
        </form>
    </>
};

const Input = ({input, meta, ...props}) => {
    let error;
    if (meta.touched && meta.invalid) {
        error = meta.error
    }
    return <div>
        <input {...props} {...input} placeholder={error}/>
    </div>
};

let fieldRequired = (value) => {
    if (!value) return "Required"
};

export default reduxForm({form: 'login'})(Login);
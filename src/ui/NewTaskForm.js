import React from 'react';
import {Field} from "redux-form";

const NewTaskForm = () => {
    return <>
        <span/>
        <Field component={Input} type={'text'} name={'username'} validate={[fieldRequired]}/>
        <Field component={Input} type={'email'} name={'email'} validate={[fieldRequired, emailRequired]}/>
        <Field component={Input} type={'text'} name={'text'} validate={[fieldRequired]}/>
        <button type="submit">Добавить</button>
    </>
};

const Input = ({input, meta, ...props}) => {
    let error;
    if(meta.touched && meta.invalid){
        error = meta.error
    }
    return <div>
        <input {...props} {...input} placeholder={error}/>
    </div>
};

let fieldRequired = (value) => {
    if (!value) return "Required"
};

let emailRequired = (value) => {
    const errors = {};
    if (!value.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
        errors.email = 'Invalid email address'
    }
};

export default NewTaskForm;
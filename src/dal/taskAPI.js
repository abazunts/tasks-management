import * as axios from "axios";

const userName = 'bazunts';

export const instance = axios.create({
    baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2/",
});

const tasksAPI = {
    getTasks(page = 1, sort_field, sort_direction) {
        return instance.get(`?developer=${userName}&page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}`).then(response => {
            return response.data
        }).catch(err => {
            return err
        })
    },
    addTask(task) {
        let {username, email, text} = task;
        let form = new FormData();
        form.append("username", username);
        form.append("email", email);
        form.append("text", text);
        return instance.post(`create?developer=${userName}`, form).then(response => {
            return response.data
        }).catch(err => {
            return err
        })
    },

    logIn(user) {
        let {username, password} = user;
        let accessData = new FormData();
        accessData.append("username", username);
        accessData.append("password", password);
        return instance.post(`login?developer=${userName}`, accessData).then(response => {
            debugger
            return response.data
        }).catch(err => {
            return err
        })
    },

    editTask(data) {
        let {token, text, status, id} = data;
        let accessData;
        if(text){
            accessData = new FormData();
            accessData.append("text", text);
            accessData.append("token", token);
        } else {
            accessData = new FormData();
            accessData.append("status", status);
            accessData.append("token", token);
        }

        return instance.post(`/edit/${id}?developer=${userName}`, accessData).then(response => {
        debugger
            return response.data
        }).catch(err => {
            return err
        })
    },

};





export default tasksAPI;
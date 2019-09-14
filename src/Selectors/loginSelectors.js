import {createSelector} from "reselect";

const getToken = state => state.login.token;
const getErrorMessage = state => state.login.errorMessage;


export const tokenSelector = createSelector(
    getToken,
    (token) => token
);

export const errorMessageSelector = createSelector(
    getErrorMessage,
    (errorMessage) => errorMessage
);

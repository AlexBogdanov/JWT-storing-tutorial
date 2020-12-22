import { ajaxCall, formRequestData } from './ajaxService';
import constants from './../common/constants';

const loginUrl = `${constants.ajax.baseUrl}/user/login`;
const validateTokenUrl = `${constants.ajax.baseUrl}/user/validate`;
const logoutUrl = `${constants.ajax.baseUrl}/user/logout`;
const refreshTokenUrl = `${constants.ajax.baseUrl}/user/refresh-jwt`;

const ajaxLogin = userData => new Promise((res, rej) => {
    ajaxCall(loginUrl, formRequestData(constants.ajax.methods.post, false, constants.ajax.credentials.include, userData))
        .then(res)
        .catch(rej);
})

const ajaxValidateToken = () => new Promise((res, rej) => {
    ajaxCall(validateTokenUrl, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
});

const ajaxLogout = () => new Promise((res, rej) => {
    ajaxCall(logoutUrl, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);

});
const ajaxRefreshToken = () => new Promise((res, rej) => {
    ajaxCall(refreshTokenUrl, formRequestData(constants.ajax.methods.get, false, constants.ajax.credentials.include))
        .then(res)
        .catch(rej);
});

export {
    ajaxLogin,
    ajaxValidateToken,
    ajaxLogout,
    ajaxRefreshToken
};

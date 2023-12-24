import request from './client';
import { serverUrl, protocol } from '../util/config';

const url = `${protocol}://${serverUrl}/organization-management/api`;

const getUser = (email) => {
    var params = {
        email: email
    }
    return request({ method: 'get', url: url + '/user', params: params })
}

const changePassword = ({ email, password }) => {
    var body = { email: email, password: password }
    return request({ method: 'post', url: url + '/user/password_change', body: body })
}

const changeUserInfo = ({ userInfo, email }) => {
    return request({ method: 'patch', url: url + '/user/edit_info', body: userInfo, params: { email: email } })
}

const changeEmail = ({ previousEmail, newEmail }) => {
    var body = {
        previousEmail: previousEmail,
        newEmail: newEmail,
    }
    return request({ method: 'patch', url: url + '/user/edit_email', body: body })
}

const changeUserRole = ({ previousRole, newRole, email }) => {
    var body = {
        previousRole: previousRole,
        newRole: newRole,
    }
    return request({ method: 'patch', url: url + '/user/edit_role', body: body, params: { email: email } })
}

const postUser = async (user) => {
    return request({ method: 'post', url: url + '/register/user', body: user });
}

const getUsers = ({ organization, filter }) => {
    var params = {
        organization: organization
    }
    if (filter) {
        params.filter = filter;
    }
    return request({ method: 'get', url: url + '/user/organization', params: params });
}

const deleteUser = ({ email }) => {
    var params = {
        email: email
    }
    return request({ method: 'delete', url: url + '/user/delete', params: params })
}

const postAvatar = ({ email, file }) => {
    var body = new FormData();
    body.append('multipartFile', file);
    return request({ method: 'post', url: url + '/user/upload-avatar', params: { email: email }, body: body })
}

export { getUser, changePassword, changeUserInfo, changeEmail, 
    changeUserRole, postUser, getUsers, deleteUser, postAvatar };
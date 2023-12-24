import request from './client';
import { serverUrl, protocol } from '../util/config';

const url = `${protocol}://${serverUrl}/organization-management/api`;

const postOrganization = async (organization) => {
    return request({ method: 'post', url: url + '/register/organization', body: organization });
}

const patchOrganization = async ({ organization, email }) => {
    return request({ method: 'patch', url: url + '/organizations/edit', body: organization, params: { email: email } });
}

const deleteOrganization = async (params) => {
    return request({ method: 'delete', url: url + '/organizations/delete', params: params })
}

const getOrganizations = async (params) => {
    return request({ method: 'get', url: url + '/organizations', params: params });
}

const getOrganization = async (email) => {
    return request({ method: 'get', url: url + '/organizations/organization', params: { email: email }})
}

export { postOrganization, patchOrganization, deleteOrganization, getOrganizations, getOrganization };
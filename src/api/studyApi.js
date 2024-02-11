import request from './client';
import { serverUrl, protocol } from '../util/config';

const url = `${protocol}://${serverUrl}/organization-management/api/s3/studies`;

const getAll = (params) => {
    return request({ method: 'get', url: url + '/get', params: params })
}

const getById = ({ key }) => {
    return request({ method: 'get', url: url + '/get-study', params: { key: key } })
}

const postComment = ({ key, comment }) => {
    return request({ method: 'post', url: url + '/comment', body: { key: key, comment: comment } })
}

const getInfo = ({ key }) => {
    return request({ method: 'get', url: url + '/get-info', params: { key: key } })
}

export default { getAll, getById, postComment, getInfo };
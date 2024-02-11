import request from './client';
import { protocol, serverUrl } from '../util/config';

const url = `${protocol}://${serverUrl}/organization-management/api/s3/local`;

export const getByteUrl = (key) => url + `/get-byte?key=${key}`

const getBytes = (key) => {
    return url + '/get-byte?key=' + key
}

const getFiles = () => {
    return request({ method: 'get', url: url + '/get' });
}

const deleteFile = ({ fileNames }) => {
    return request({ method: 'delete', url: url + '/delete', body: { fileNames: fileNames } });
}

const postDirectory = ({ path }) => {
    var params = {
        path: path
    }
    return request({ method: 'post', url: url + '/create-folder', params: params })
}

const postFile = ({ path, files }) => {
    var body = new FormData();
    for (let i = 0; i < files.length; i++) {
        body.append('multipartFiles', files.item(i));
    }
    var params = {
        path: path
    }
    return request({ method: 'post', url: url + '/upload', body: body, params: params });
}

const deleteDirectory = ({ folderName }) => {
    var params = {
        folderName: folderName
    }
    return request({ method: 'delete', url: url + '/delete-folder', params: params })
}

export default { getFiles, deleteFile, postDirectory, deleteDirectory, postFile, getBytes };
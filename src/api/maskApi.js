import request from './client';
import { serverUrl, protocol } from '../util/config';

const url = `${protocol}://${serverUrl}/scan-provider/api/ai`

const getMask = (key) => {
    return request({ method: 'get', url: url + '/get_mask', params: { key: key }})
}

const getResults = (key) => {
    return request({ method: 'get', url: url + '/get_results', params: { key: key }})
}

export { getMask, getResults };
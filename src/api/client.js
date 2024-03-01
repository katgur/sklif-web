import axios from 'axios';

export let accessToken;

export const setAccessToken = (value) => {
    accessToken = value;
}

export default function request({ method, url, body, params }) {

    let headers = { 'Authorization': `Bearer ${accessToken}` }

    const config = {
        url: url,
        method: method,
        headers: headers,
    }

    if (body) {
        config.data = body;
    }

    if (params) {
        config.params = params;
    }

    return axios(config);
}
import { serverUrl, clientId, protocol } from '../util/config';
import axios from 'axios';
import { Buffer } from 'buffer';

const url = `${protocol}://${serverUrl}/security-management/oauth2`;

const getToken = (code, redirectUri, codeVerifier) => {
    var params = {
        client_id: clientId,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code: code,
        code_verifier: codeVerifier,
    }
    return axios({
        url: url + '/token',
        method: 'post',
        params: params,
        headers: { 'Authorization': `Basic ${Buffer.from(`${clientId}:secret`).toString('base64')}` }
    })
}

const refreshToken = (refresh_token) => {
    var details = {
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token',
    };

    var body = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        body.push(encodedKey + "=" + encodedValue);
    }
    body = body.join("&");

    return axios({ method: 'post', url: url + '/token', data: body, 
    headers: { 'Authorization': `Basic ${Buffer.from(`${clientId}:secret`).toString('base64')}` } })
}

export { getToken, refreshToken };
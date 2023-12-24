import { serverUrl, protocol } from '../../util/config';
import axios from 'axios';
import { getToken, refreshToken } from '../authApi';
import { Buffer } from 'buffer';

jest.mock('axios');
const url = `${protocol}://${serverUrl}/security-management/oauth2`;

describe('auth api', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('token', async () => {
        axios.mockReturnValue('token');
        var response = await getToken('code', 'redirect_uri', 'code_verifier');
        expect(axios).toBeCalledWith(
            {
                method: 'post', url: url + '/token', params: {
                    client_id: 'client',
                    redirect_uri: 'redirect_uri',
                    grant_type: 'authorization_code',
                    code: 'code',
                    code_verifier: 'code_verifier',
                },
                headers: { 'Authorization': `Basic ${Buffer.from('client:secret').toString('base64')}` }
            }
        )
        expect(response).toBe('token')
    })

    it('refresh', async () => {
        axios.mockReturnValue('token');
        var response = await refreshToken('refresh_token');
        var details = {
            'refresh_token': 'refresh_token',
            'grant_type': 'refresh_token',
        };

        var body = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            body.push(encodedKey + "=" + encodedValue);
        }
        body = body.join("&");

        expect(axios).toBeCalledWith(
            { method: 'post', url: url + '/token', data: body }
        )
        expect(response).toBe('token');
    })
});
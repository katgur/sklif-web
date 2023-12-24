import axios from 'axios';
import { serverUrl, protocol } from '../../util/config';
import { setAccessToken, setClient } from '../client';
import request from '../client';

jest.mock('axios');
const url = `${protocol}://${serverUrl}/organization-management/api`;
setClient(url, 'bearer')
setAccessToken('mock');

describe('client', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should make right axios config', async () => {
        await request({ method: 'method', endpoint: '/endpoint', body: { foo: 'foo' }, params: { bar: 'bar' } });
        expect(axios).toBeCalledWith(
            {
                url: url + '/endpoint',
                method: 'method',
                headers: {
                    'Authorization': 'Bearer mock'
                },
                data: { foo: 'foo' },
                params: { bar: 'bar' },
            }
        )
    })
});
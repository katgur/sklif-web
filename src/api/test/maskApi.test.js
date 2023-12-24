import { serverUrl, protocol } from '../../util/config';
import request from '../client';
import { getMask, getResults } from '../maskApi';

jest.mock('axios');
jest.mock('../client');
const url = `${protocol}://${serverUrl}/organization-management/api`;

var results = {
    key: 'path/to/results',
    status: 'READY',
    totalVolume: 1,
    percentage: 100.0
}

describe('study api', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('get mask', async () => {
        request.mockReturnValue('path/to/mask');
        var response = getMask('key');
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/get_mask', params: { key: 'key' } }
        )
        expect(response).toBe('path/to/mask');
    })

    it('get results', async () => {
        request.mockReturnValue(results);
        var response = await getResults('key');
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/get_results', params: { key: 'key' } }
        )
        expect(response).toBe(results);
    })
});
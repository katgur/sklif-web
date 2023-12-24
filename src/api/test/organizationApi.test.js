import { serverUrl, protocol } from '../../util/config';
import request from '../client';
import { deleteOrganization, getOrganization, getOrganizations, patchOrganization, postOrganization } from '../organizationApi';

jest.mock('axios');
jest.mock('../client');
const url = `${protocol}://${serverUrl}/organization-management/api`;

const org = {
    "email": "hse@hse.ru",
    "name": "HSE",
    "administratorFullName": "Test Test Test",
    "phoneNumber": "098",
    "address": "Ulitsa Sezam"
}

const orgs = [
    {
        "email": "hse@hse.ru",
        "name": "HSE",
        "administratorFullName": "Test Test Test",
        "phoneNumber": "098",
        "address": "Ulitsa Sezam"
    }
]

describe('org api', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('add org', async () => {
        request.mockReturnValue('org added');
        var response = await postOrganization(org);
        expect(request).toBeCalledWith(
            { method: 'post', url: url + '/register/organization', body: org }
        )
        expect(response).toBe('org added')
    })

    it('get org', async () => {
        request.mockReturnValue(org);
        var response = await getOrganization('mock')
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/organizations/organization', params: { email: 'mock' } }
        )
        expect(response).toBe(org);
    })

    it('get orgs', async () => {
        request.mockReturnValue(orgs);
        var response = await getOrganizations();
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/organizations' }
        )
        expect(response).toBe(orgs);
    })

    it('delete org', async () => {
        request.mockReturnValue('org deleted');
        var response = await deleteOrganization({ email: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'delete', url: url + '/organizations/delete', params: { email: 'mock' } }
        )
        expect(response).toBe('org deleted');
    })

    it('edit org', async () => {
        request.mockReturnValue('org edited');
        var response = await patchOrganization({ organization: org, email: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'patch', url: url + '/organizations/edit', body: org, params: { email: 'mock' } }
        )
        expect(response).toBe('org edited');
    })
});
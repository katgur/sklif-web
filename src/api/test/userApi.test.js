import { serverUrl, protocol } from '../../util/config';
import { changeEmail, changePassword, changeUserInfo, changeUserRole, deleteUser, getUser, getUsers, postUser } from '../userApi';
import request from '../client';

jest.mock('axios');
jest.mock('../client');
const url = `${protocol}://${serverUrl}/organization-management/api`;

const user = {
    "email": "lrezunic@gmail.com",
    "password": "12345",
    "firstName": "Людмила",
    "lastName": "Резуник",
    "patronymic": "Александровна",
    "phoneNumber": "+79129329178",
    "role": "DOCTOR",
    "organization": "HSE"
}

const users = [
    {
        "email": "lrezunic@gmail.com",
        "password": "12345",
        "firstName": "Людмила",
        "lastName": "Резуник",
        "patronymic": "Александровна",
        "phoneNumber": "+79129329178",
        "role": "DOCTOR",
        "organization": "HSE"
    }
]


describe('user api', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('add user', async () => {
        var user = {
            "email": "email@mail.ru",
            "password": "abcde",
            "firstName": "firstName",
            "lastName": "lastName",
            "patronymic": "patronymic",
            "phoneNumber": "+phoneNumber",
            "role": "DOCTOR",
            "organization": "organization"
        }
        request.mockReturnValue('user added');
        var response = await postUser(user);
        expect(request).toBeCalledWith(
            { method: 'post', url: url + '/register/user', body: user }
        )
        expect(response).toBe('user added')
    })

    it('get user', async () => {
        request.mockReturnValue(user);
        var response = await getUser('mock');
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/user', params: { email: 'mock' } }
        )
        expect(response).toBe(user);
    })

    it('get users', async () => {
        request.mockReturnValue(users);
        var response = await getUsers({ organization: 'mock' });
        expect(request).toBeCalledWith(
            { method: 'get', url: url + '/user/organization', params: { organization: 'mock' } }
        )
        expect(response).toBe(users);
    })

    it('delete user', async () => {
        request.mockReturnValue('user deleted');
        var response = await deleteUser({ email: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'delete', url: url + '/user/delete', params: { email: 'mock' } }
        )
        expect(response).toBe('user deleted');
    })

    it('edit user info', async () => {
        request.mockReturnValue('user info edited');
        var response = await changeUserInfo({ userInfo: user, email: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'patch', url: url + '/user/edit_info', body: user, params: { email: 'mock' } }
        )
        expect(response).toBe('user info edited');
    })

    it('edit user role', async () => {
        request.mockReturnValue('user role edited');
        var response = await changeUserRole({ previousRole: 'foo', newRole: 'bar', email: 'mock' })
        expect(request).toBeCalledWith(
            { method: 'patch', url: url + '/user/edit_role', body: { previousRole: 'foo', newRole: 'bar' }, params: { email: 'mock' } }
        )
        expect(response).toBe('user role edited');
    })

    it('edit user email', async () => {
        request.mockReturnValue('user email edited');
        var response = await changeEmail({ previousEmail: 'foo', newEmail: 'bar' })
        expect(request).toBeCalledWith(
            { method: 'patch', url: url + '/user/edit_email', body: { previousEmail: 'foo', newEmail: 'bar' } }
        )
        expect(response).toBe('user email edited');
    })

    it('edit password', async () => {
        request.mockReturnValue('user password edited');
        var response = await changePassword({ email: 'mock', password: 'foo' })
        expect(request).toBeCalledWith(
            { method: 'post', url: url + '/user/password_change', body: { email: 'mock', password: 'foo' } }
        )
        expect(response).toBe('user password edited');
    })
});
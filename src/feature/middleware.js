import { mapUserForClient, mapUsersForClient } from '../util/mapper';
import { addNewUser, editUser, setUser, setUsers } from './user/usersSlice';

export const mapMiddleware = state => next => action => {
    if (setUsers.match(action)) {
        next({ ...action, payload: mapUsersForClient(action.payload) });
    } else if (addNewUser.match(action) || editUser.match(action) || setUser.match(action)) {
        next({ ...action, payload: mapUserForClient(action.payload) });
    }
}
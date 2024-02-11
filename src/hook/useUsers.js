import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectAll } from '../feature/user/usersSlice';
import { useEffect } from 'react';

function useUsers() {
    const users = useSelector(selectAll);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!users) {
            dispatch(fetchUsers());
        }
    }, []);

    return users;
}

export default useUsers;
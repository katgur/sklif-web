import { useSelector } from 'react-redux';
import { fetchUsers, selectAll } from '../feature/user/usersSlice';
import { useEffect } from 'react';
import useApiDispatch from "./useApiDispatch.js";

function useUsers() {
    const users = useSelector(selectAll);
    const dispatch = useApiDispatch();
    
    useEffect(() => {
        if (!users) {
            dispatch(fetchUsers());
        }
    }, []);

    return users;
}

export default useUsers;
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectAll } from '../feature/user/usersSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useRef } from 'react';
import useAuthUser from './useAuthUser';
import { mapIfRole } from '../util/mapper';

function useUsers() {
    const users = useSelector(selectAll);
    const dispatch = useDispatch();
    const params = useParams();
    const search = useRef();
    const user = useAuthUser();

    useEffect(() => {
        if (!user) {
            return;
        }
        if (users && params.search === search.current) {
            return;
        }
        console.log(params)

        if (!params.search) {
            dispatch(fetchUsers({ organization: user.organization, filter: "" }));
            search.current = params.search;
            return;
        }
        if (params.search !== search.current) {
            dispatch(fetchUsers({ organization: user.organization, filter: mapIfRole(params.search) }));
            search.current = params.search;
        }
    }, [dispatch, user, users, params])

    return users;
}

export default useUsers;
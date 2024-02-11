import { useEffect } from 'react';
import { useParams } from 'react-router';
import { selectCurrent } from '../feature/user/usersSlice';
import { fetchUser } from '../feature/user/usersSlice';
import { selectData } from '../feature/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function useUser() {
    const dispatch = useDispatch();
    const params = useParams();
    const data = useSelector(selectData);
    const currentUser = useSelector(selectCurrent);
    // const authUser = useSelector(selectAuth);

    useEffect(() => {
        if (params.id) {
            if (currentUser && currentUser.email === params.id) {
                return;
            }
            dispatch(fetchUser(params.id));
        }
    }, [params, data, dispatch, currentUser])

    return currentUser
}

export default useUser;
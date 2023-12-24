import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../feature/authSlice";
import { fetchAuthUser, selectAuth } from "../feature/user/usersSlice";
import { useEffect } from "react";

function useAuthUser() {
    const data = useSelector(selectData);
    const authUser = useSelector(selectAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && !authUser) {
            dispatch(fetchAuthUser(data.email));
        }
    }, [data, authUser, dispatch]);

    return authUser;
}

export default useAuthUser;
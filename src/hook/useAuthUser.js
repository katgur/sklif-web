import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../feature/authSlice";
import { fetchUser } from "../feature/user/usersSlice";
import { useEffect } from "react";

function useAuthUser() {
    const data = useSelector(selectData);
    // const authUser = useSelector(selectAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(fetchUser(data.email));
        }
    }, [data, dispatch]);

    return data;
}

export default useAuthUser;
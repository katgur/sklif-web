import useApiDispatch from "../hook/useApiDispatch";
import { logout } from "../feature/auth/authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function LogoutPage() {
    const dispatch = useApiDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate("/login");
    }, [])

    return <span>...Logout</span>
}

export default LogoutPage;
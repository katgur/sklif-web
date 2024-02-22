import { useDispatch } from "react-redux"
import { logout } from "../feature/auth/authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function LogoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate("/login");
    }, [])

    return <span>...Logout</span>
}

export default LogoutPage;
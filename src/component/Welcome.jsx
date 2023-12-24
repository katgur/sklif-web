import { useEffect } from "react";
import { useNavigate } from "react-router";

function Welcome() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home/profile');
    }, [navigate]);

    return <></>
}

export default Welcome;
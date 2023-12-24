import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function useNavigateIfSuccess({ to, select }) {
    const status = useSelector(select);
    const navigate = useNavigate();

    return () => {
        if (status.code === 200) {
            navigate(to);
        }
    }
}

export default useNavigateIfSuccess;
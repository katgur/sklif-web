import { useDispatch, useSelector } from 'react-redux';
import { fetchStudies, selectAll } from '../feature/study/studiesSlice';
import { useEffect } from 'react';

function useStudies() {
    const dispatch = useDispatch();
    const studies = useSelector(selectAll);

    useEffect(() => {
        if (!studies) {
            dispatch(fetchStudies());
        }
    }, [studies])

    return studies;
}

export default useStudies;
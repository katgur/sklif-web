import { useSelector } from 'react-redux';
import { fetchStudies, selectAll } from '../feature/study/studiesSlice';
import { useEffect } from 'react';
import useApiDispatch from "./useApiDispatch.js";

function useStudies() {
    const dispatch = useApiDispatch();
    const studies = useSelector(selectAll);

    useEffect(() => {
        if (!studies) {
            dispatch(fetchStudies());
        }
    }, [studies])

    return studies;
}

export default useStudies;
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudies, selectAll } from './studiesSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useRef } from 'react';

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
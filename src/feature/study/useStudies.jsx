import { useDispatch, useSelector } from 'react-redux';
import { fetchStudies, selectAll } from './studiesSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useRef } from 'react';

function useStudies() {
    const dispatch = useDispatch();
    const studies = useSelector(selectAll);
    const params = useParams();
    const search = useRef();

    useEffect(() => {
        if (params.search !== search.current) {
            dispatch(fetchStudies({ filter: params.search }));
            search.current = params.search;
        } else {
            if (!studies) {
                dispatch(fetchStudies());
            }
        }
    }, [dispatch, studies, params])

    return studies;
}

export default useStudies;
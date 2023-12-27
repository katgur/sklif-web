import { useDispatch, useSelector } from 'react-redux';
import { selectAll, fetchOrganizations } from '../feature/org/orgSlice';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

function useOrganizations(isGlobal) {
    const dispatch = useDispatch();
    const organizations = useSelector(selectAll);
    const search = useRef();
    const params = useParams();

    console.log(organizations)
    useEffect(() => {
        if (!isGlobal) {
            return;
        }
        if (params.search !== search.current) {
            dispatch(fetchOrganizations({ filter: params.search }));
            search.current = params.search;
        } else {
            if (!organizations) {
                dispatch(fetchOrganizations());
            }
        }
    }, [dispatch, organizations, isGlobal, params])

    return organizations;
}

export default useOrganizations;
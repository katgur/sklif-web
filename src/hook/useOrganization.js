import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrent } from '../feature/org/orgSlice';
import { fetchOrganization } from '../feature/org/orgSlice';

function useOrganization() {
    const dispatch = useDispatch();
    const params = useParams();
    const currentOrg = useSelector(selectCurrent);

    useEffect(() => {
        if (!currentOrg && params.id) {
            dispatch(fetchOrganization(params.id));
        }
    }, [params, dispatch, currentOrg])

    return currentOrg;
}

export default useOrganization;
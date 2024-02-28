import { useSelector } from 'react-redux';
import { selectAll, fetchOrganizations } from '../feature/org/orgSlice';
import { useEffect } from 'react';
import useApiDispatch from './useApiDispatch';

function useOrganizations() {
    const dispatch = useApiDispatch();
    const organizations = useSelector(selectAll);

    useEffect(() => {
        if (!organizations) {
            dispatch(fetchOrganizations());
        }
    }, [organizations])

    return organizations;
}

export default useOrganizations;
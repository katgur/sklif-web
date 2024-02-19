import { useDispatch, useSelector } from 'react-redux';
import { selectAll, fetchOrganizations } from '../feature/org/orgSlice';
import { useEffect } from 'react';

function useOrganizations() {
    const dispatch = useDispatch();
    const organizations = useSelector(selectAll);

    useEffect(() => {
        if (!organizations) {
            dispatch(fetchOrganizations());
        }
    }, [organizations])

    return organizations;
}

export default useOrganizations;
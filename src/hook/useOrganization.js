import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api/mock/organizationApi';
import { addError } from '../feature/notification/notificationSlice';

function useOrganization(email) {
    const [organization, setOrganization] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!email) {
            return;
        }
        api.getOrganization(email)
            .then(newOrganization => {
                setOrganization(newOrganization);
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить данные организации${error.response ? `: ${error.response.data.error}` : ""}`));
            })
    }, [])

    return organization;
}

export default useOrganization;
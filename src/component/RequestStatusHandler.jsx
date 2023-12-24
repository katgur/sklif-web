import { selectStatus as usersSelectStatus } from '../feature/user/usersSlice';
import { selectStatus as userSelectStatus } from '../feature/authSlice';
import { selectStatus as orgSelectStatus } from '../feature/org/orgSlice';
import { selectStatus as studySelectStatus } from '../feature/study/studiesSlice';
import { selectStatus as maskSelectStatus } from '../feature/study/maskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorAlert, SuccessAlert, NotifyAlert } from '../component/ui/Alert';
import { resetStatus as resetUserStatus } from '../feature/authSlice';
import { resetStatus as resetUsersStatus } from '../feature/user/usersSlice';
import { resetStatus as resetOrgStatus } from '../feature/org/orgSlice';
import { resetStatus as resetStudiesStatus } from '../feature/study/studiesSlice';
import { selectStatus as storeSelectStatus } from '../feature/storage/storageSlice';
import { resetStatus as storeResetStatus } from '../feature/storage/storageSlice';
import { resetStatus as maskResetStatus } from '../feature/study/maskSlice';
import { createPortal } from 'react-dom';
import { clientUrl, protocol } from '../util/config';
import { useEffect } from 'react';
import { useState } from 'react';

function RequestStatusHandler() {
    const usersStatus = useSelector(usersSelectStatus);
    const userStatus = useSelector(userSelectStatus);
    const orgStatus = useSelector(orgSelectStatus);
    const storeStatus = useSelector(storeSelectStatus);
    const studyStatus = useSelector(studySelectStatus);
    const maskStatus = useSelector(maskSelectStatus);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const setError = (status, reset) => {
            if (status.message) {
                setErrors(errors.concat(status));
                dispatch(reset());
            }
        }
        setError(userStatus, resetUserStatus);
        setError(usersStatus, resetUsersStatus);
        setError(orgStatus, resetOrgStatus);
        setError(storeStatus, storeResetStatus);
        setError(studyStatus, resetStudiesStatus);
        setError(maskStatus, maskResetStatus);
    }, [userStatus, usersStatus, orgStatus, storeStatus, studyStatus, maskStatus, dispatch, errors, setErrors]);

    const onAlertClose = (id) => {
        var newErrors = [...errors];
        newErrors.splice(id, 1);
        setErrors(newErrors);
    }

    var wrapper = document.getElementById('alert');
    var content = (
        <div className="alerts">
            {
                errors.map((status, index) => {
                    if (status.code === 401) {
                        window.location.href = `${protocol}://${clientUrl}/login`;
                        return <ErrorAlert key={index} id={index} text={status.message} onClose={onAlertClose} />
                    } else if (status.code === 3) {
                        return <SuccessAlert key={index} id={index} text={status.message} onClose={onAlertClose} />
                    } else if (status.code === 1) {
                        return <NotifyAlert key={index} id={index} text={status.message} onClose={onAlertClose} />
                    } else if (status.code >= 400 || status.code === 0) {
                        return <ErrorAlert key={index} id={index} text={status.message} onClose={onAlertClose} />
                    }
                })
            }
        </div>
    )

    return createPortal(content, wrapper)
}

export default RequestStatusHandler;
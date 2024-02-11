import { useDispatch, useSelector } from "react-redux"
import { getNotifications } from "./notificationSlice"
import Alert from '../../component/ui/Alert'
import { removeNotification } from "./notificationSlice";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

function Notifications() {
    const notifications = useSelector(getNotifications)
    const dispatch = useDispatch();
    const [wrapper, setWrapper] = useState(null);

    useEffect(() => {
        let newWrapper = document.getElementById('alert');
        if (!newWrapper) {
            newWrapper = document.createElement('div');
            newWrapper.setAttribute('id', 'alert');
            document.body.appendChild(newWrapper);
        }
        setWrapper(newWrapper);

        return () => {
            if (newWrapper.parentNode) {
                newWrapper.parentNode.removeChild(newWrapper);
            }
        }
    }, [])

    return wrapper && createPortal(notifications.length !== 0 &&
        <ul>
            {
                notifications.map(notification => {
                    return <Alert key={notification.id} {...notification} onClose={() => dispatch(removeNotification(notification.id))} />
                })
            }
        </ul>, wrapper)
}

export default Notifications
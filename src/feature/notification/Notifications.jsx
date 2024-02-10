import { useDispatch, useSelector } from "react-redux"
import { getNotifications } from "./notificationSlice"
import Alert from '../../component/ui/Alert'
import { removeNotification } from "./notificationSlice";
import { createPortal } from "react-dom";

function Notifications() {
    const notifications = useSelector(getNotifications)
    const dispatch = useDispatch();

    const wrapper = document.getElementById("alert");

    return createPortal(notifications.length && <ul>
        {
            notifications.map(notification => {
                return <Alert key={notification.id} {...notification} onClose={() => dispatch(removeNotification(notification.id))} />
            })
        }
    </ul>, wrapper)
}

export default Notifications
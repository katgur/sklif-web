import { useDispatch, useSelector } from "react-redux"
import { getNotifications } from "./notificationSlice"
import Alert from '../../component/ui/Alert'
import { removeNotification } from "./notificationSlice";

function Notifications() {
    const notifications = useSelector(getNotifications)
    const dispatch = useDispatch();

    return (
        <ul>
            {
                notifications.map(notification => {
                    return <Alert key={notification.id} {...notification} onClose={() => dispatch(removeNotification(notification.id))} />
                })
            }
        </ul>
    )
}

export default Notifications
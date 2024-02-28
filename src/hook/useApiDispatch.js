import { useDispatch } from "react-redux";
import { addSuccess, addError } from "../feature/notification/notificationSlice";
import { resetProgress, setProgress } from "../feature/progress/progressSlice";

function useApiDispatch() {
    const dispatch = useDispatch();

    return async (apiAction) => {
        const { api, action, message } = apiAction;
        const id = Date.now();
        dispatch(setProgress(id));
        try {
            const data = await api();
            if (action) {
                dispatch(action(data));
            }
            if (message && message.success) {
                dispatch(addSuccess(message.success));
            }
            return true;
        } catch (error) {
            if (message && message.error) {
                dispatch(addError(`${message.error}: ${error.message}`));
            }
            return false;
        } finally {
            dispatch(resetProgress(id));
        }
    }
}

export default useApiDispatch;
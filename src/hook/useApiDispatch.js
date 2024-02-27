import { useDispatch } from "react-redux";
import { addSuccess, addError } from "../feature/notification/notificationSlice";
import { resetProgress, setProgress } from "../feature/progress/progressSlice";

function useApiDispatch() {
    const dispatch = useDispatch();

    return async (apiAction) => {
        dispatch(setProgress(apiAction.action.type));
        try {
            const data = await apiAction.api();
            dispatch(apiAction.action(data));
            if (apiAction.message && apiAction.message.success) {
                dispatch(addSuccess(apiAction.message.success));
            }
            return true;
        } catch (error) {
            if (apiAction.message && apiAction.message.error) {
                dispatch(addError(`${apiAction.message.error}: ${error.message}`));
            }
            return false;
        } finally {
            dispatch(resetProgress(apiAction.action.type));
        }
    }
}

export default useApiDispatch;
import { useDispatch } from "react-redux";
import { addSuccess, addError } from "../feature/notification/notificationSlice";

function useApiDispatch() {
    const dispatch = useDispatch();

    return async (apiAction) => {
        // set progress
        try {
            const data = await apiAction.api();
            dispatch(apiAction.action(data));
            if (apiAction.message && apiAction.message.success) {
                dispatch(addSuccess(apiAction.message.success));
            }
            // add status ok
        } catch (error) {
            if (apiAction.message && apiAction.message.error) {
                dispatch(addError(`${apiAction.message.error}: ${error.message}`));
            }
            // add status error
        } finally {
            // reset progress
        }
    }
}

export default useApiDispatch;
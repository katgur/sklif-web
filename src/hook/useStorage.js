import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles, selectAll } from "../feature/storage/storageSlice";

function useStorage() {
    const dispatch = useDispatch();
    const files = useSelector(selectAll);

    useEffect(() => {
        if (files.length === 0) {
            dispatch(fetchFiles());
        }
    }, [dispatch, files])
}

export default useStorage;
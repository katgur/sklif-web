import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchFiles, selectAll } from "../feature/storage/storageSlice";
import useApiDispatch from "./useApiDispatch.js";

function useStorage() {
    const dispatch = useApiDispatch();
    const files = useSelector(selectAll);

    useEffect(() => {
        dispatch(fetchFiles());
    }, [])

    return files;
}

export default useStorage;
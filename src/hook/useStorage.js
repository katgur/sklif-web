import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { fetchFiles, selectAll } from "../feature/storage/storageSlice";
import useApiDispatch from "./useApiDispatch.js";

function useStorage() {
    const isFetched = useRef(false);
    const dispatch = useApiDispatch();
    const files = useSelector(selectAll);

    useEffect(() => {
        if (!isFetched.current) {
            dispatch(fetchFiles());
            isFetched.current = true;
        }
    }, [])

    return files;
}

export default useStorage;
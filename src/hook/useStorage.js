import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles, selectAll } from "../feature/storage/storageSlice";

function useStorage() {
    const isFetched = useRef(false);
    const dispatch = useDispatch();
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
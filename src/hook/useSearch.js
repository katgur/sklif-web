import useApiDispatch from "./useApiDispatch";
import { search, selectData } from "../feature/search/searchSlice";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function useSearch() {
    const { filter } = useParams();
    const dispatch = useApiDispatch();
    const data = useSelector(selectData);

    useEffect(() => {
        dispatch(search(filter));
    }, []);

    return data;
}

export default useSearch;
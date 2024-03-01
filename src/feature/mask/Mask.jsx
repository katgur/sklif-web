import { useSelector } from "react-redux";
import { fetchMask, selectResult } from "./maskSlice";
import { MaskedImage } from "tailwind-admin";
import { useEffect } from "react";
import useApiDispatch from "../../hook/useApiDispatch.js";

function Mask({ path }) {
    const result = useSelector(selectResult);
    const dispatch = useApiDispatch();

    useEffect(() => {
        dispatch(fetchMask(path));
    }, [path])

    return (
        <MaskedImage url={result.url} />
    )
}

export default Mask;